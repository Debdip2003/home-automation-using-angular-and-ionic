import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interface/room';
import { ROOMS } from 'src/app/mockData/room';
import { CommonModule } from '@angular/common';
import { Device } from 'src/app/interface/device';
import { DEVICES } from 'src/app/mockData/device';
import { DeviceCardComponent } from 'src/app/components/device-card/device-card.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonTitle,
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
  private route = inject(ActivatedRoute);

  roomId: string | null = null;
  roomData = signal<Room[]>([]);
  devices = signal<Device[]>([]);

  // Load all saved device statuses: { "1": true, "2": false }
  savedStatuses = signal<Record<number, boolean>>(
    JSON.parse(localStorage.getItem('deviceStatus') || '{}')
  );

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    if (this.roomId) {
      const room = ROOMS.find(r => r.id.toString() === this.roomId);
      this.roomData.set(room ? [room] : []);

      this.devices.set(
        DEVICES.filter(d => d.room_id.toString() === this.roomId)
      );
    }
  }

  // Called when a child component toggles a device
  updateDeviceStatus(deviceId: number, newStatus: boolean) {
    const updated = { ...this.savedStatuses(), [deviceId]: newStatus };
    this.savedStatuses.set(updated);
    localStorage.setItem('deviceStatus', JSON.stringify(updated));
  }
}
