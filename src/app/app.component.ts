import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EventsService } from 'angular4-events';
import { Socket } from 'ngx-socket-io';
import { config } from './config/config';
import { APP_MENU, PRO_MENU } from './config/menu';
import { StorageService } from './services/storage.service';
import firebase from 'firebase';

const userKey = config.USERINFO_STORAGE_KEY;
const profile_photo = config.PROFILE_PHOTO_STORAGE_KEY;


const firebaseConfig = {
  apiKey: "AIzaSyCaPF_RwCmSO-nHRxYCiJTa4mco_-IzeiE",
  authDomain: "knockout-e79b5.firebaseapp.com",
  projectId: "knockout-e79b5",
  storageBucket: "knockout-e79b5.appspot.com",
  messagingSenderId: "861408304731",
  appId: "1:861408304731:web:8e2adfbc33f0cc406a697e",
  measurementId: "G-D9TE8NXRQY"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  clickNotificationSub: any;
  currentUser: any;
  menuItems = APP_MENU

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private router: Router,
    private statusBar: StatusBar,
    private events: EventsService,
    private localNotifications: LocalNotifications,
    private socket: Socket,
    public storageService: StorageService
  ) {
    this.initializeApp();

    firebase.initializeApp(firebaseConfig);

    this.socket.connect();

    this.sendServiceRequestNotification();
  }

  async ngOnInit() {
    const user: any = await this.storageService.getObject(userKey)
    if (user && user.role == "athlete") this.menuItems = PRO_MENU
    if (user && user.role == "customer") this.menuItems = APP_MENU


    this.events.subscribe('role-change', role => {
      if (role == "athlete") this.menuItems = PRO_MENU
      else if (role == 'customer') this.menuItems = APP_MENU;
    })
  }

  async initializeApp() {
    await this.platform.ready()
    this.statusBar.styleDefault()
    this.splashScreen.hide()

    // this.clickNotificationSub = this.localNotifications.on('click').subscribe(data => {
    //   this.router.navigate(['/pro-tablinks/pro-services']);
    //   //this.unsub();
    // });
  }

  async sendServiceRequestNotification() {
    this.currentUser = await this.storageService.getObject(userKey);
    if (this.currentUser) {

      this.socket.fromEvent('service_request_notification').subscribe(service_request => {
        var receive_user_id = service_request['to_user_id'];

        if (this.currentUser.user_id == receive_user_id) {
          this.openRequestNotification();
        }
      });
    }
  }

  openRequestNotification() {
    this.localNotifications.schedule({
      id: Date.now(),
      text: 'You have new service request.',
      data: { secret: 'service_request' }
    });
  }

  unsub() {
    this.clickNotificationSub.unsubscribe();
  }

  logout() {
    this.storage.remove(userKey);
    this.storage.remove(profile_photo);
    this.router.navigate(['/signin']);
  }
}
//ionic cordova run ios --target="A89C1114-5C2D-40ED-A0A1-7C70CDD399E3" --livereload