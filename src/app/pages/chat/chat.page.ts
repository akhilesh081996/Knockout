import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ActionSheetController, IonContent, LoadingController, Platform } from '@ionic/angular';
import firebase from 'firebase';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { config } from 'src/app/config/config';
import { ChatService } from 'src/app/services/chat/chat.service';
import { StorageService } from 'src/app/services/storage.service';

const userinfo = config.USERINFO_STORAGE_KEY;

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  isAttachment = false;

  attachmentFile;
  receiverInfo;
  attachmentType;
  user;
  message;
  acceptType;
  attachementThumbnail;

  loading;

  @ViewChild('attachInput') inputElement: ElementRef
  @ViewChild(IonContent) chatContent: IonContent

  chatList;
  senderDatabaseRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private chatService: ChatService,
    private socialSharing: SocialSharing,
    private videoPlayer: VideoPlayer,
    private platform: Platform,
    private loadingController: LoadingController,
    public actionSheetController: ActionSheetController
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.receiverInfo = this.router.getCurrentNavigation().extras.state.receiverInfo;
      }
    });

    this.user = await this.storageService.getObject(userinfo)

    this.senderDatabaseRef = `chats/${this.user.user_id}/${this.user.user_id}_${this.receiverInfo.from_user_id}`

    firebase.database().ref(`${this.senderDatabaseRef}/messages`).on('value', resp => {
      this.chatList = [];
      this.chatList = snapshotToArray(resp);
      this.message = null;
      this.attachmentFile = null
      if (this.loading) this.loading.dismiss()
      setTimeout(() => this.chatContent.scrollToBottom());
    });
  }


  sendMessage() {

    if (!this.attachmentFile) {
      if (!this.message) return;
    }

    const timeDate = moment().format('MMMM Do YYYY, h:mm:ss a')

    const receiverDatabaseRef = `chats/${this.receiverInfo.from_user_id}/${this.receiverInfo.from_user_id}_${this.user.user_id}`

    const senderInfo = {
      receiver_id: this.receiverInfo.from_user_id,
      receiver_name: this.receiverInfo.from_user_name,
      receiver_avatar: this.receiverInfo.customer_profile_picture,
      recent_message: this.message,
      time_date: timeDate
    }

    const receiverInfo = {
      receiver_id: this.user.user_id,
      receiver_name: `${this.user.first_name} ${this.user.last_name}`,
      receiver_avatar: this.user.profileImg,
      recent_message: this.message,
      time_date: timeDate
    }

    firebase.database().ref(this.senderDatabaseRef).update(senderInfo)
    firebase.database().ref(receiverDatabaseRef).update(receiverInfo)

    const senderMessage = {
      sender_id: this.user.user_id,
      sender_name: `${this.user.first_name} ${this.user.last_name}`,
      sender_avatar: this.user.profileImg,
      receiver_id: this.receiverInfo.from_user_id,
      receiver_name: this.receiverInfo.from_user_name,
      receiver_avatar: this.receiverInfo.customer_profile_picture,
      message: this.message,
      dateTime: timeDate,
      read_status: 0
    }

    /*  const receiverMessage = {
       receiver_id: this.user.user_id,
       receiver_name: `${this.user.first_name} ${this.user.last_name}`,
       receiver_avatar: this.user.profileImg,
       sender_id: this.receiverInfo.from_user_id,
       sender_name: this.receiverInfo.from_user_name,
       sender_avatar: this.receiverInfo.customer_profile_picture,
       message: this.message,
       dateTime: timeDate,
       read_status: 0
     } */

    if (this.attachmentFile) {
      this.chatService.sendAttachment(this.attachmentFile, this.user.token).pipe(
        tap(res => {
          this.isAttachment = false;
          senderMessage['file_path'] = res.file_path
          senderMessage['file_type'] = this.attachmentType
          firebase.database().ref(`${this.senderDatabaseRef}/messages`).push(senderMessage)
          firebase.database().ref(`${receiverDatabaseRef}/messages`).push(senderMessage)
        })
      ).subscribe()

    } else {
      firebase.database().ref(`${this.senderDatabaseRef}/messages`).push(senderMessage)
      firebase.database().ref(`${receiverDatabaseRef}/messages`).push(senderMessage)
    }
  }

  chooseFile(type) {
    this.acceptType = type;
    this.attachmentType = this.acceptType
    setTimeout(() => this.inputElement.nativeElement.click())
  }

  onFileSelected(event) {
    this.attachmentFile = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(this.attachmentFile);
    fileReader.onload = () => {
      this.attachementThumbnail = fileReader.result
    }

    this.showLoader()
    this.sendMessage();
  }

  toggleAttachement() {
    this.isAttachment = !this.isAttachment
  }

  async presentActionSheet(chat) {

    let actionButton = [
      {
        text: 'Share',
        handler: () => {
          this.shareFile(chat)
        }
      },
      /* {
       text: 'Save',
       handler: () => {
         console.log('Play clicked');
       }
     } */
    ]

    if (chat.file_type == 'video') {
      actionButton.push({
        text: 'Archieve',
        handler: () => this.saveToArchieve(chat)
      })
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      cssClass: 'chat-action',
      buttons: actionButton
    });

    await actionSheet.present();
  }

  saveToArchieve(chat) {
    this.showLoader()
    const params = {
      token: this.user.token,
      url: chat.file_path,
      thumb_url: chat.file_path
    }
    this.chatService.saveToArchieve(params).subscribe(res => {
      if (res.status == 'ok') this.presentAlert('Video saved to archieve')
      this.loading.dismiss()
    })
  }

  shareFile(chat) {

    this.socialSharing.share("", "", " ", chat.file_path).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    })
  }

  async showLoader() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await this.loading.present();
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    })
    await loading.present()
  }

  playVideo(chat) {
    if (this.platform.is('cordova')) {
      this.videoPlayer.play(chat.file_path).then(() => {
        console.log('video completed');
      }).catch(err => {
        console.log(err);
      });
    }
  }

  goback() {
    let route = '/tablinks/messages'
    if (this.user.role = 'Athelet') route = '/pro-tablinks/messages'
    this.router.navigate([route])
  }

}
