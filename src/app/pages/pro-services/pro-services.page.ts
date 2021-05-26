import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-services',
  templateUrl: './pro-services.page.html',
  styleUrls: ['./pro-services.page.scss'],
})

export class ProServicesPage implements OnInit {
  user: any;
  status = "pending";
  isLoading = false;
  requestList = [];

  constructor(
    public userService: UserService,
    private router: Router,
    public loadingController: LoadingController,
    public storageService: StorageService,
    public menuCtrl: MenuController,
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
      duration: 3000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }

  segmentChanged() {
    this.requestList = [];
    this.getServiceRequests();
  }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }

}
