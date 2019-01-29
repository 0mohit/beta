import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public view:ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    setTimeout(()=>{
      this.view.dismiss();
    },2000)
  }

}
