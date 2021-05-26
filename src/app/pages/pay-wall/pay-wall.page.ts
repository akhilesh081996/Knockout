import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { config } from 'src/app/config/config';
import { PaywallService } from 'src/app/services/paywall.service';
import { StorageService } from 'src/app/services/storage.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pay-wall',
  templateUrl: './pay-wall.page.html',
  styleUrls: ['./pay-wall.page.scss'],
})
export class PayWallPage implements OnInit {
  user;

  paywallData;

  constructor(
    public storageService: StorageService,
    private paywallService: PaywallService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.user = await this.storageService.getObject(userinfo)
    this.getPaywalls()
  }


  getPaywalls() {
    this.paywallService.getPaywall(this.user.token).subscribe(
      res => this.paywallData = res.list
    )

  }

  payWallDetail(payWall) {
    let navigationExtras: NavigationExtras = {
      state: {
        paywall: payWall
      }
    }
    this.router.navigate(['pay-wall-detail'], navigationExtras)
  }

  back() {
    this.location.back()
  }

}
