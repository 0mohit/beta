import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";


@IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    loginForm: FormGroup;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.formInit();
    }
    removeSpace(FormControlName) {
        if (this.loginForm.value[FormControlName].length != this.loginForm.value[FormControlName].replace(/\s/g, '').length) {
            let data = {};
            data[FormControlName] = this.loginForm.value[FormControlName].trim();
            this.loginForm.patchValue(data)
        }
    }
    formInit() {
        this.loginForm = new FormGroup({
            password: new FormControl("", [Validators.required]),
            userName: new FormControl("", [Validators.required])
        });
    }
    signUp() {
        this.navCtrl.push("RegisterPage");
    }


    logInForm(formData) {
        console.log(formData)
        this.navCtrl.setRoot('ProfilePage')
    }
}