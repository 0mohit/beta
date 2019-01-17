import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  image: string;
  constructor(public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }
  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      targetWidth: 600,
      targetHeight: 600,
      quality: 50,
      correctOrientation: true
    }).then((imageData) => {
      console.log("image",imageData)
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
        if (filePath.indexOf('.jpg') !== -1) {
          var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpg') + 4);
        } else if (filePath.indexOf('.png') !== -1) {
          var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.png') + 4);
        } else {
          var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpeg') + 4);
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

