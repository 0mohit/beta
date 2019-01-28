import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { DbInitProvider } from './../../providers/db-init/db-init';
import { PhotoViewer } from '@ionic-native/photo-viewer';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  image: string;
  sensoor = {
    temperature: null,
    moisture: null,
    pressure: null
  }
  brightness = 0;
  location;
  imageToBeUpload = '';
  constructor(public navParams: NavParams,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private _toast: ToastProvider,
    public _db: DbInitProvider,
    public popoverCtrl: PopoverController
  ) {
  }
  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.location = JSON.parse(localStorage.getItem('userData'));
    }
    console.log("location", this.location)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }
  viewPhoto() {
    this.photoViewer.show(this.imageToBeUpload);
  }

  getReading() {
    if (this.validateSensoorList()) {
      // 'AND CreatedTime > 'DATE_SUB(curdate(), INTERVAL 1 DAY)'
      // let query = `SELECT * FROM SensorReadings WHERE UserId=${this.location['UserId']} AND DeviceId='${this.location['DeviceId']}`
      // this._db.executeQuery(query).then((res: any) => {
      // if (res.rows.length == 0) {
      let date = new Date();
      let query = `INSERT INTO SensorReadings(UserId ,DeviceId,Temperature, Moisture ,Pressure ,MediaUrl,SkinCondition,CreatedTime,UpdatedTime) VALUES  (${this.location['UserId']},'${this.location['DeviceId']}','${this.sensoor['temperature']}','${this.sensoor['moisture']}','${this.sensoor['pressure']}','${this.imageToBeUpload}',${this.brightness},'${date}','${date}')`
      console.log("query", query)
      this._db.executeQuery(query).then((res: any) => {
        console.log("***", res)
        // if (res.rows.length) {

        const popover = this.popoverCtrl.create('MessagePage');
        popover.present();
        this._toast.toast(`SensorReadings insert successfully `, 3000);
        // }
      }).catch(e => {
        console.log("err***************", e)
      })
    } else {
      this._toast.toast(`User Already Set SensorReadings `, 3000);
    }
    // }).catch(e => {
    // this._toast.toast(`Query fail`, 3000);
    // console.log("err", e)
    // })


    // }
    //  else {
    // this._toast.toast(`All Sensoor Fileds are required`, 3000);
    // }

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
      this.imageToBeUpload = imageData;
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
        this.imageToBeUpload = updatedUrl;
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

