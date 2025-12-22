import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastMessage {
  constructor(private toastController: ToastController) {}

  async show(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary',
    duration = 2000
  ) {
    const toast = await this.toastController.create({
      message,
      color,
      duration,
      position: 'top',
    });

    await toast.present();
  }

  //different scenerios of the toast messages
  success(message: string) {
    this.show(message), 'success';
  }
  error(message: string) {
    this.show(message, 'danger');
  }
  warning(message: string) {
    this.show(message, 'warning');
  }
}
