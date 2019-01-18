import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'footer-bottom',
  templateUrl: 'footer-bottom.html'
})
export class FooterBottomComponent {
  constructor(private iab: InAppBrowser) {
  }
  openUrl() {
    this.iab.create('www.betamedtech.com', '_blank', 'hardwareback=yes ,location=yes');
  }
}
