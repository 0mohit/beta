import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  image: string;
  sensoor = {
    temperature: 0,
    moisture: 0,
    pressure: 0
  }
  location = localStorage.getItem('userData');
  constructor(public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private _toast: ToastProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }

  getReading() {
    if (this.validateSensoorList()) {

    } else {
      this._toast.toast(`All Sensoor Fileds are required`, 3000);
    }

  }

  validateSensoorList() {
    let isValid = true;
    Object.keys(this.sensoor).forEach((value) => {
      if (this.sensoor[value]) {
        isValid = false;
      }
    })
    return !isValid;
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 600,
      targetHeight: 600,
      quality: 50,
      correctOrientation: true
    }).then((imageData) => {
      console.log("image", imageData)
    }, (err) => {
      console.log(err);
    });
  }
  openGallery() {
    let cameraOptions: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions)
      .then(filePath => {
        console.log('filePath', filePath)
        let updatedUrl;
        if (filePath.indexOf('.jpg') !== -1) {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpg') + 4);
        } else if (filePath.indexOf('.png') !== -1) {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.png') + 4);
        } else {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpeg') + 4);
        }
        var fileName = updatedUrl.substr(updatedUrl.lastIndexOf('/') + 1);

        console.log("fileName", updatedUrl)

      },
        err => console.log(err));
  }
  mediaActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Camera',
          role: 'camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.openGallery();
          }
        }
      ]
    });

    actionSheet.present();
  }
}

