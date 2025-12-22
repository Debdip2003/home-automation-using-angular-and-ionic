import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import {
  IonItem,
  IonCard,
  IonIcon,
  IonLabel,
  IonToggle,
} from '@ionic/angular/standalone';
import { Device } from 'src/app/interface/device';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
  standalone: true,
  imports: [IonToggle, IonLabel, IonIcon, IonCard, IonItem],
})
export class DeviceCardComponent {
  @Input() deviceData!: Device; // Input device object
  @Output() statusChange = new EventEmitter<{
    deviceId: number;
    status: boolean;
  }>();

  // Signal for status
  deviceStatus = signal<boolean>(false);

  ngOnInit() {
    if (this.deviceData) {
      this.deviceStatus.set(this.deviceData.status);
    }
  }

  handleToggle() {
    const newStatus = !this.deviceStatus();
    this.deviceStatus.set(newStatus);
    this.statusChange.emit({
      deviceId: Number(this.deviceData.id),
      status: newStatus,
    });
  }
}
