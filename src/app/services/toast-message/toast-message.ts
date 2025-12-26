import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastMessage {
  constructor(private toastController: ToastController) {}

  async show(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary',
    position: 'top' | 'bottom' | 'middle' = 'top',
    duration = 2000
  ) {
    const toast = await this.toastController.create({
      message,
      color,
      duration,
      position,
    });

    await toast.present();
  }

  //different scenerios of the toast messages
  success(message: string, position: 'top' | 'bottom' | 'middle' = 'top') {
    this.show(message, 'success', position);
  }
  error(message: string, position: 'top' | 'bottom' | 'middle' = 'top') {
    this.show(message, 'danger', position);
  }
  warning(message: string, position: 'top' | 'bottom' | 'middle' = 'top') {
    this.show(message, 'warning', position);
  }
}
