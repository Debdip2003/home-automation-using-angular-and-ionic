import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonAvatar,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
  IonFab,
  IonFabButton,
  ModalController,
  IonTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { RoomCardComponent } from 'src/app/components/room-card/room-card.component';
import { Room } from 'src/app/interface/room';
import { RoomData } from 'src/app/services/rooms/room-data';
import { ModalComponentComponent } from 'src/app/components/modal-component/modal-component.component';
import { ToastMessage } from 'src/app/services/toast-message/toast-message';
import { Geolocation } from '@capacitor/geolocation';
import { home_pageLocation } from 'src/app/interface/location';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonTitle,
    IonFabButton,
    IonFab,
    IonItemDivider,
    IonCol,
    IonRow,
    IonGrid,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonLabel,
    IonItem,
    IonButtons,
    IonIcon,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonContent,
    IonText,
    RoomCardComponent,
  ],
})
export class HomePage implements OnInit {
  //injecting the dependencies from the room service
  private roomDataService = inject(RoomData);
  private toastMessageService = inject(ToastMessage);

  private isActive = false; //totoggle the function call when the view enter or leaves
  roomData = signal<Room[]>([]);
  currentLocation = signal<home_pageLocation | null>(null);
  user: User | null = localStorage.getItem('loggedInUserDetails')
    ? JSON.parse(localStorage.getItem('loggedInUserDetails')!)
    : null;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    // this.roomData.set(ROOMS);
    this.roomDataService.fetchRoom().subscribe({
      next: (res) => {
        console.log(res);
        this.roomData.set(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ionViewDidEnter() {
    this.isActive = true;

    //getting the live location after the view has entered
    if (!this.currentLocation()) {
      this.getLiveLocationofUser();
    }
  }

  ionViewWillLeave() {
    this.isActive = false;
    this.currentLocation.set(null); //resetting the location signal to null when the view leaves
  }

  //open modal function
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponentComponent,
      componentProps: {
        title: 'Add Room',
        label: 'Room Name',
        placeholder: 'e.g. Living Room',
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    //if the user press the confirm button
    if (role === 'confirm') {
      const newRoom: Room = {
        id: this.roomData().length + 1,
        name: data.name,
        deviceCount: 0,
        icon: 'home',
        selected: false,
      };
      this.roomDataService.addRoom(newRoom).subscribe({
        next: (res) => {
          //if room name is empty then donot add anything to the list
          if (newRoom.name === '') {
            this.toastMessageService.warning('Room name cannot be empty');
            return;
          }
          //show the toast notification
          this.toastMessageService.success('Room added successfully!');
          this.roomData.update((rooms) => [...rooms, newRoom]); //updating the ui instantly after the user have added a new room
        },
        error: (error) => {
          this.toastMessageService.error(
            'Failed to add room. Please try again.'
          );
        },
      });
    }
  }

  //get the latitude and longitude of the user using the capacitor geolocation plugin
  async getCurrentAddressofUser() {
    const {
      coords: { latitude, longitude },
    } = await Geolocation.getCurrentPosition();

    if (!this.isActive) return null; //if isActive is false, return null

    //else call the function
    const res = fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    ).then((data) => data.json());
    return res;
  }

  //set the current location signal
  async getLiveLocationofUser() {
    const location = await this.getCurrentAddressofUser();
    this.currentLocation.set(location);
    console.log(this.currentLocation());
  }

  navigateToLoginOrSignupOrProfile() {
    if (this.user) {
      this.router.navigate(['/user-profile']);
      return;
    } else {
      this.router.navigate(['/login-page']);
    }
  }

  logoutUser() {
    this.user = null;
    localStorage.removeItem('loggedInUserDetails');
    this.toastMessageService.success('Logged out successfully!', 'bottom');
  }
}
