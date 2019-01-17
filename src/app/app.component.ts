import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbInitProvider } from '../providers/db-init/db-init';
import { ToastProvider } from '../providers/toast/toast';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  backPressed: boolean = false;

  pages: Array<{ title: string, component: any }>;

  constructor(private app: App,
    private ionicApp: IonicApp,
    public _dbInit: DbInitProvider,
    public platform: Platform,
    public statusBar: StatusBar,
    private _toast: ToastProvider,
    public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkBackButton();
    });
    if (this.platform.is('cordova')) {
      this._dbInit.openDb();
    }
  }

  checkBackButton() {
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs()[0];
      if (nav.canGoBack()) {
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
          var refVar = activePortal;
          activePortal.dismiss();
          activePortal = refVar;
        } else {
          nav.pop();
        }
      } else {
        if (!this.backPressed) {
          this.backPressed = true;
          this._toast.toast('Press Again To Exit App', 3000);
          setTimeout(() => this.backPressed = false, 2000);
          return;
        } else {
          navigator['app'].exitApp();
        }
      }
    }, 100);
  }
}
