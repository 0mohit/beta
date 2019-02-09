import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Row } from 'ionic-angular';
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
  displayNone = true;
  location;
  errorType = {
    required: false,
    limit: false
  }
  user = {
    age: 73,
    weight: 61
  }
  operater = '';
  imageToBeUpload = '';
  pressureUlser: any = false;
  reInit = true;
  constructor(public navParams: NavParams,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private _toast: ToastProvider,
    public _db: DbInitProvider,
    public popoverCtrl: PopoverController,
    public nav: NavController
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

  evaluatePressure() {
    let query = `SELECT * FROM SensorLookupTable WHERE ${this.sensoor['temperature']} >= TemperatureMin AND ${this.sensoor['temperature']} <= TemperatureMax AND ${this.sensoor['moisture']} >= MoistureMin AND ${this.sensoor['moisture']} <= MoistureMax AND ${this.sensoor['pressure']} >= PressureMin AND  ${this.sensoor['pressure']} <= PressureMax AND ${this.user.age} >= AgeMin AND  ${this.user.age} <= AgeMax AND ${this.user.weight} >= WeightMin AND  ${this.user.weight} <= WeightMax `
    this._db.executeQuery(query).then((res: any) => {
      this.reInit = false;
      let plessurUlser = res.rows.item(0);
      if (plessurUlser && plessurUlser.Id) {
        console.log("evaluatePressure", plessurUlser, plessurUlser['PressureUlser']);
        if (plessurUlser['PressureUlser'].indexOf('>') != -1) {
          let value = plessurUlser['PressureUlser'].split('>');
          this.pressureUlser = value[1] * 1;
          this.operater = "gt";
        } else if (plessurUlser['PressureUlser'].indexOf('<') != -1) {
          let value = plessurUlser['PressureUlser'].split('<');
          this.pressureUlser = value[1] * 1;
          this.operater = "lt"
        } else {
          this.pressureUlser = plessurUlser['PressureUlser'];
        }
      } else {
        this.pressureUlser = false;
      }
      setTimeout(() => {
        this.reInit = true;
      }, 100)
      console.log("this.pressureUlser", this.pressureUlser)
    }).catch(e => {
      console.log("err**evaluatePressure*************", e)
    })
  }


  getReading() {
    if (this.validateSensoorList()) {
      this.evaluatePressure();
      // 'AND CreatedTime > 'DATE_SUB(curdate(), INTERVAL 1 DAY)'
      // let query = `SELECT * FROM SensorReadings WHERE UserId=${this.location['UserId']} AND DeviceId='${this.location['DeviceId']}`
      // this._db.executeQuery(query).then((res: any) => {
      // if (res.rows.length == 0) {
      let date = new Date();
      let query = `INSERT INTO SensorReadings(UserId ,DeviceId,Temperature, Moisture ,Pressure ,MediaUrl,SkinCondition,CreatedTime,UpdatedTime) VALUES  (${this.location['UserId']},'${this.location['DeviceId']}','${this.sensoor['temperature']}','${this.sensoor['moisture']}','${this.sensoor['pressure']}','${this.imageToBeUpload}',${this.brightness},'${date}','${date}')`
      this._db.executeQuery(query).then((res: any) => {
        this.displayNone = false;
        // if (res.rows.length) {
        this.sensoor = {
          temperature: null,
          moisture: null,
          pressure: null
        }
        this.brightness = null;
        this.imageToBeUpload = null;
        this.nav.push('SummaryReportPage');
        // this.navParams.
        // this._toast.toast(`SensorReadings insert successfully `, 3000);
        // }
      }).catch(e => {
        console.log("err***************", e)
        this._toast.toast(`SensorReadings Entry Fail`, 3000);

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

  validateEntryOnkeyup(data) {
    this.errorType.required = false;
    if (data > 1000) {
      this.errorType.limit = true;
    } else {
      this.errorType.limit = false;
    }
  }

  validateSensoorList() {
    let isValid = true;
    let chaeckReq = true;
    Object.keys(this.sensoor).forEach((value) => {
      if (!this.sensoor[value]) {
        isValid = false;
        chaeckReq = false;
        this.errorType.required = true;

      } else {
        if (this.sensoor[value] > 1000) {
          isValid = false;
        }
      }
    })

    console.log("chaeckReq", chaeckReq)
    if (chaeckReq) {
      this.errorType.required = false;
    }
    return isValid;
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
        let updatedUrl;
        if (filePath.indexOf('.jpg') !== -1) {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpg') + 4);
        } else if (filePath.indexOf('.png') !== -1) {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.png') + 4);
        } else {
          updatedUrl = filePath.slice(0, filePath.lastIndexOf('.jpeg') + 4);
        }
        var fileName = updatedUrl.substr(updatedUrl.lastIndexOf('/') + 1);
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

