import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }
  
}
