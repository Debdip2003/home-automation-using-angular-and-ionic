import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonCard, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Room } from 'src/app/interface/room';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  imports: [IonLabel, IonItem, IonCard, IonIcon, RouterLink],
})
export class RoomCardComponent implements OnInit {
  roomData = input<Room>(); //creating an input signal for the room details

  constructor() {
    // console.log(this.roomData()?.name);
  }

  ngOnInit() {}
}
