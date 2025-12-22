import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonInput } from '@ionic/angular/standalone';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],

  imports: [
    IonInput,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonToolbar,
    FormsModule,
  ],
})
export class ModalComponentComponent implements OnInit {
  @Input() title = 'Add Item';
  @Input() label = 'Name';
  @Input() placeholder = 'Enter name';
  @Input() value = '';

  name!: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.name = this.value;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ name: this.name }, 'confirm');
  }
}
