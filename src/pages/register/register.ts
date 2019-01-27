import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { PasswordValidation } from './../../validation/passwordConform';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { DbInitProvider } from './../../providers/db-init/db-init';
import { ToastProvider } from '../../providers/toast/toast';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  register: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private _toast: ToastProvider,
    public _db: DbInitProvider,
    public androidPermissions: AndroidPermissions) {
    this.formInit();
  }


  ionViewDidLoad() {

    this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, 
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      ]
    );

    this.getLocation();


  }
  formInit() {
    this.register = new FormGroup({
      careProviderName: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      physicinName: new FormControl("", [Validators.required, Validators.maxLength(30)]),
      mobile: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      confirmPassword: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      userName: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      deviceId: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      location: new FormControl("", [Validators.required, Validators.maxLength(200)]),
      Daenerys: new FormControl(true)
    }, PasswordValidation.MatchPassword);

  }
  getLocation() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderReverseResult[]) => {
          console.log(JSON.stringify(result[0]))
          const location = `${result[0].subAdministrativeArea} ${result[0].subLocality} ${result[0].locality} ${result[0].administrativeArea} ${result[0].countryName} ${result[0].postalCode}`
          this.register.patchValue({ 'location': location });
          // this._toast.toast(`Location get successfully `, 3000);
        })
        .catch((error: any) => {
          // this._toast.toast(`Location is required `, 3000)
        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }
  registerForm(formData) {
    console.log(formData.value, formData.valid)
    if (!formData.valid) {
      this.register.get('mobile').markAsDirty();
      this.register.get('password').markAsDirty();
      this.register.get('careProviderName').markAsDirty();
      this.register.get('physicinName').markAsDirty();
      this.register.get('confirmPassword').markAsDirty();
      this.register.get('userName').markAsDirty();
      this.register.get('location').markAsDirty();
      this.register.get('deviceId').markAsDirty();
    } else {
      let date = new Date();
      let daenerys;
      if (formData.value['Daenerys']) {
        daenerys = 1;
      } else {
        daenerys = 0;
      }
      let query = `INSERT INTO User (CareProviderName,PhysicianName,Mobile,UserName,Password,Location,DeviceId,CreatedTime,UpdatedTime,Daenerys) VALUES  ('${formData.value['careProviderName']}','${formData.value['physicinName']}',${formData.value['mobile']},'${formData.value['userName']}','${formData.value['password']}','${formData.value['location']}','${formData.value['deviceId']}','${date}','${date}',${daenerys})`
      console.log("***********", query)
      this._db.executeQuery(query).then((res) => {
        formData.value['UserId'] = res['insertId']
        localStorage.setItem('userData', JSON.stringify(formData.value));
        this.navCtrl.setRoot("ProfilePage");
        this._toast.toast(`Wellcome ${formData.value['userName']}`, 3000);
      }).catch((err) => {
        if (err.code == 6) {
          this._toast.toast('User Name Already Exist', 3000);
        }
        console.log("**********err", err.message)
      })
    }
  }
}
