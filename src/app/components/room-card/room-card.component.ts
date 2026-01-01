import { Component, inject, input, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonReorder,
  IonButton,
} from '@ionic/angular/standalone';
import { Room } from 'src/app/interface/room';
import { RoomData } from 'src/app/services/rooms/room-data';
import { ToastMessage } from 'src/app/services/toast-message/toast-message';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  imports: [IonButton, IonReorder, IonLabel, IonItem, IonIcon, RouterLink],
})
export class RoomCardComponent implements OnInit {
  //injecting the required services
  private roomDataService = inject(RoomData);
  private toastMessageService = inject(ToastMessage);

  //initializing the values
  roomData = input<Room>(); //creating an input signal for the room details
  deleteRoom = output<number | string | undefined>();

  constructor() {
    // console.log(this.roomData()?.name);
  }

  ngOnInit() {}
}
