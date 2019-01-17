import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    //  private camera: Camera,

     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }
  // takePicture() {
  //   this.camera.getPicture({
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     correctOrientation: true
  //   }).then((imageData) => {
  //     this.imageBase64 = "data:image/jpeg;base64," + imageData;
  //     localStorage.setItem('profile', this.imageBase64);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  // openGallery() {
  //   let cameraOptions: CameraOptions = {
  //     sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.Camera.DestinationType.FILE_URI,
  //     quality: 50,
  //     targetWidth: 600,
  //     targetHeight: 600,
  //     encodingType: this.Camera.EncodingType.JPEG,
  //     correctOrientation: true
  //   }

  //   this.Camera.getPicture(cameraOptions)
  //     .then(filePath => {
  //       console.log('filePath', filePath)
  //       if (filePath.indexOf('.jpg') !== -1) {
  //         var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpg') + 4);
  //       } else if (filePath.indexOf('.png') !== -1) {
  //         var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.png') + 4);
  //       } else {
  //         var updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpeg') + 4);
  //       }
  //       var fileName = updatedUrl.substr(updatedUrl.lastIndexOf('/') + 1);
  //       this.fab.close();
  //       this.mediaData = {
  //         path: updatedUrl,
  //         name: fileName,
  //         type: 'gallery',
  //       };
  //       this.mediaType.gallery = true;
  //     },
  //       err => console.log(err));
  // }
}
