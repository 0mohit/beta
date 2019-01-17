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
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation) {
    this.formInit();
    this.getLocation();
  }
  formInit() {
    this.register = new FormGroup({
      careProviderName: new FormControl("", [Validators.required]),
      physicinName: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required])
    }, PasswordValidation.MatchPassword);

  }
  getLocation() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log("locaton", resp)

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderReverseResult[]) => {
          console.log(JSON.stringify(result[0]))
          const location = `${result[0].subAdministrativeArea} ${result[0].subLocality} ${result[0].locality} ${result[0].administrativeArea} ${result[0].countryName} ${result[0].postalCode}`
          this.register.patchValue({ 'location': location })
        })
        .catch((error: any) => console.log(error));

    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }
  registerForm(formData) {
    console.log(formData.value)
  }
}
