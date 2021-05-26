import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/config/config';
import { StorageService } from 'src/app/services/storage.service';
import firebase from 'firebase';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

const userinfo = config.USERINFO_STORAGE_KEY;

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  })
  return returnArr;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss']
})

export class MessagePage implements OnInit {
  user;
  loading;

  chatUsers;

  constructor(
    private router: Router,
    private location: Location,
    private storageService: StorageService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {

    this.user = await this.storageService.getObject(userinfo)

    firebase.database().ref(`chats/${this.user.user_id}`).on('value',
      res => {
        this.chatUsers = snapshotToArray(res)
        if (this.loading) this.loading.dismiss()
      })
  }

  opneChat(receiver) {

    const receiverInfo = {
      from_user_id: receiver.receiver_id,
      from_user_name: receiver.receiver_name,
      customer_profile_picture: receiver.receiver_avatar
    }

    const navigationExtras: NavigationExtras = { state: { receiverInfo } }

    this.router.navigate(['/chat'], navigationExtras)
  }

  async showLoader() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await this.loading.present();
  }


  goBack() {
    this.location.back();
  }

}
