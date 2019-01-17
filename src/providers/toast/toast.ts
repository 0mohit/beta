import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
@Injectable()
export class ToastProvider {

  constructor(public _platform: Platform, private toastCtrl: ToastController) {
  }
  toast(message?: string, duration?: any, position: string = 'bottom') {
    if (this._platform.is('cordova')) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    } else {
      console.log("please run on a device");
    }
  }
}
