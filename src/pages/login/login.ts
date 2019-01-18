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
        console.log("*******")
        this.navCtrl.push("RegisterPage");
    }


    logInForm(formData) {
        console.log(formData)
        this.navCtrl.setRoot('ProfilePage')
    }
    
    // this.DataBase.executeSql(`UPDATE ${tableName} SET Password='${pass}' , LastUpdatedDateTime='${this.getCurentTimeDate()}' WHERE EmailAddress = '${email}'`, []).then((res) => {
    //     resolve(pass);
    // }).catch(e => {
    //     reject(e);
    // });

    // checkWhichTableEmailExits(email) {
    //     return new Promise((resolve, reject) => {
    //         this.DataBase.executeSql(`SELECT * FROM Customer_Table WHERE EmailAddress='${email}'`, []).then((res) => {
    //             if (res.rows.length) {
    //                 resolve('Customer_Table');
    //             }
    //             else {
    //                 this.DataBase.executeSql(`SELECT * FROM Contact_Table WHERE EmailAddress='${email}'`, []).then((res) => {
    //                     if (res.rows.length) {
    //                         resolve('Contact_Table')
    //                     } else {
    //                         reject('Wrong email');
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // }
}