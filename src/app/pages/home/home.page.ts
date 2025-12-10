import { Component, OnInit, signal } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { RoomCardComponent } from 'src/app/components/room-card/room-card.component';
import { Room } from 'src/app/interface/room';
import { ROOMS } from 'src/app/mockData/room';

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
  roomData = signal<Room[]>([]);

  constructor() {}

  ngOnInit() {
    this.roomData.set(ROOMS);
    // console.log(this.roomData());
  }
}
