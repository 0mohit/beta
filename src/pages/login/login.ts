import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { ToastProvider } from '../../providers/toast/toast';
import { DbInitProvider } from './../../providers/db-init/db-init';


@IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    loginForm: FormGroup;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _toast: ToastProvider,
        public _db: DbInitProvider
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
        if (!formData.valid) {
            this.loginForm.get('password').markAsDirty();
            this.loginForm.get('userName').markAsDirty();
        } else {
            let query = `SELECT * FROM User WHERE UserName='${formData.value['userName']}' AND Password='${formData.value['password']}'`
            console.log("query", query)
            this._db.executeQuery(query).then((res: any) => {
                if (res.rows.length) {
                    localStorage.setItem('userData', JSON.stringify(res.rows.item(0)));
                    this.navCtrl.setRoot('ProfilePage');
                    this._toast.toast(`Wellcome ${formData.value['userName']}`, 3000);
                } else {
                    this._toast.toast(`User Not Found`, 3000);
                }
            }).catch((err) => {
                console.log(err)
                // if (err.code == 6) {
                //     this._toast.toast('User Name Already Exist', 3000);
                // }
            })
        }

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