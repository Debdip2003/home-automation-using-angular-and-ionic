import { Component, input, output, OnInit } from '@angular/core';
import {
  IonItem,
  IonCard,
  IonIcon,
  IonLabel,
  IonToggle
} from '@ionic/angular/standalone';
import { Device } from 'src/app/interface/device';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
  imports: [IonToggle, IonLabel, IonIcon, IonCard, IonItem],
})
export class DeviceCardComponent implements OnInit {
  deviceData = input<Device>();
  deviceStatus = input<boolean>();

  statusChange = output<boolean>(); // notify parent

  ngOnInit() {
    console.log('deviceData:', this.deviceData());
    console.log('deviceStatus:', this.deviceStatus());
  }

  handleToggle() {
    const currentStatus = this.deviceStatus() ?? false;
    const newStatus = !currentStatus;

    this.statusChange.emit(newStatus);
  }
}
