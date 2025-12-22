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
} from '@ionic/angular/standalone';
import { RoomCardComponent } from 'src/app/components/room-card/room-card.component';
import { Room } from 'src/app/interface/room';
import { RoomData } from 'src/app/services/rooms/room-data';
import { ModalComponentComponent } from 'src/app/components/modal-component/modal-component.component'; //import modal component
import { ToastMessage } from 'src/app/services/toast-message/toast-message';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonItemDivider,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonItem,
    IonButtons,
    IonIcon,
    IonAvatar,
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

  roomData = signal<Room[]>([]);
  currentLocation = signal<string>('');

  constructor(private modalController: ModalController) {
    this.getLiveLocationofUser();
  }

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
    const res = fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    ).then((data) => data.json());
    return res;
  }

  //set the current location signal
  async getLiveLocationofUser() {
    this.currentLocation.set(await this.getCurrentAddressofUser());
    console.log(this.currentLocation());
  }
}
