import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { PasswordValidation } from './../../validation/passwordConform'
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  register: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formInit();
  }
  formInit() {
    this.register = new FormGroup({
      careProviderName: new FormControl("", [Validators.required]),
      physicinName: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      conformPassword: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required])
    }, PasswordValidation.MatchPassword);

  }

  registerForm(formData) {
    console.log(formData.value)
  }
}
