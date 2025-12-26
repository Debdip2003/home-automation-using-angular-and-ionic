import { RoomData } from 'src/app/services/rooms/room-data';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
  IonTitle,
  IonFab,
  IonIcon,
  IonFabButton,
  ModalController,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interface/room';
import { CommonModule } from '@angular/common';
import { Device } from 'src/app/interface/device';
import { DeviceData } from 'src/app/services/devices/device-data';
import { ToastMessage } from 'src/app/services/toast-message/toast-message';
import { ModalComponentComponent } from 'src/app/components/modal-component/modal-component.component';
import { DeviceCardComponent } from 'src/app/components/device-card/device-card.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonIcon,
    IonFab,
    IonTitle,
    IonCol,
    IonRow,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    DeviceCardComponent,
  ],
})
export class RoomDetailPage implements OnInit {
  //dependencies injections
  private route = inject(ActivatedRoute);
  private deviceDataService = inject(DeviceData);
  private toastMessageService = inject(ToastMessage);

  roomId: string | null = null;
  roomData = input<Room[]>([]);
  devices = signal<Device[]>([]);

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    //fetching the device array on the basis of roomId
    if (this.roomId) {
      this.fetchDeviceByRoomId(this.roomId);
    }

    console.log(this.roomData());
  }

  // Called when a child component toggles a device
  updateDeviceStatus(deviceId: number, newStatus: boolean) {
    this.deviceDataService.updateDeviceStatus(deviceId, newStatus).subscribe({
      next: () => {
        this.fetchDeviceByRoomId(this.roomId!);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //fetching the device by room id
  fetchDeviceByRoomId(roomId: number | string) {
    this.deviceDataService.fetchDeviceByRoomId(roomId).subscribe({
      next: (res) => {
        this.devices.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //open modal function
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponentComponent,
      componentProps: {
        title: 'Add Device',
        label: 'Device Name',
        placeholder: 'e.g. Living Room Light',
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    //if the user press the confirm button
    if (role === 'confirm') {
      const newDevice: Device = {
        id: this.devices().length + 1,
        room_id: this.roomId ? Number(this.roomId) : 0,
        name: data.name,
        icon: 'home',
        status: false,
      };
      this.deviceDataService.addDevice(newDevice).subscribe({
        next: (res) => {
          if (newDevice.name === '') {
            this.toastMessageService.warning('Device name cannot be empty');
            return;
          }
          //show the toast notification
          this.toastMessageService.success('Device added successfully!', 'top');
          this.devices.update((devices) => [...devices, newDevice]); //updating the ui instantly after the user have added a new device
        },
        error: (error) => {
          this.toastMessageService.error(
            'Failed to add room. Please try again.',
            'top'
          );
        },
      });
    }
  }
}
