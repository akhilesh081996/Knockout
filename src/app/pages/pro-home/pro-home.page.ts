import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { LoadingController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { config } from '../../config/config';
import { AnswerService } from '../../services/answer/answer.service';
import { StorageService } from '../../services/storage.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-home',
  templateUrl: './pro-home.page.html',
  styleUrls: ['./pro-home.page.scss'],
})
export class ProHomePage implements OnInit {

  token: any;
  videolist = [];
  isLoading = false;

  user: any;
  requestList = [];
  status = 'pending'

  constructor(
    public answerService: AnswerService,
    public storageService: StorageService,
    public menuCtrl: MenuController,
    public streamingMedia: StreamingMedia,
    public loadingController: LoadingController,
    public socialSharing: SocialSharing,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.user = await this.storageService.getObject(userinfo)
    this.getServiceRequests()
  }

  async getServiceRequests() {
    this.isLoading = true
    let param = {
      token: this.user.token,
      status: this.status,
      categoryId: this.user.category
    };
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.userService.getServiceRequests(param).subscribe((result) => {
      this.requestList = result.request_list;

      this.isLoading = false;
      for (var i = 0; i < this.requestList.length; i++) {
        this.requestList[i].created = this.requestList[i].created.split(' ')[0];
      }
      loading.dismiss();
    },
      (err) => {
        this.isLoading = false;
        loading.dismiss();
        if (err.status == 403)
          this.presentAlert('Service Request Not Found')
        else this.presentAlert(err.error.msg)
      })
  }

  selectService(selectedService) {
    let navigationExtras: NavigationExtras = {
      state: {
        service_request: selectedService
      }
    };
    this.router.navigate(['/pro-service-details'], navigationExtras);
  }

  sendMessage(event, service_request) {
    event.stopPropagation()

    let navigationExtras: NavigationExtras = {
      state: {
        receiverInfo: service_request
      }
    }
    this.router.navigate(['/chat'], navigationExtras);
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }


}
