import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { config } from 'src/app/config/config';
import { StorageService } from 'src/app/services/storage.service';
const userinfo = config.USERINFO_STORAGE_KEY;


@Component({
  selector: 'app-service-confirmation',
  templateUrl: './service-confirmation.page.html',
  styleUrls: ['./service-confirmation.page.scss'],
})
export class ServiceConfirmationPage implements OnInit {
  service_request;
  user;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private storageService: StorageService
  ) {
  }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state)
        this.service_request = this.router.getCurrentNavigation().extras.state.service_request
    })
    this.user = await this.storageService.getObject(userinfo)
  }

  goToChat() {
    console.log(this.service_request)
    const navigationExtra: NavigationExtras = {
      state: {
        receiverInfo: {
          from_user_id: this.service_request.user_id,
          from_user_name: this.service_request.name,
          customer_profile_picture: this.service_request.logo
        }
      }
    }

    this.router.navigate(['/chat'], navigationExtra)
  }

  rateUser() {
    console.log(this.user.user_id)
    let navigationExtras: NavigationExtras = {
      state: {
        to_user_id: this.service_request.user_id,
        request_id: String(this.user.user_id)
      }
    }
    this.router.navigate(['/rating'], navigationExtras)
  }

  goBack() {
    this.location.back()
  }

}
