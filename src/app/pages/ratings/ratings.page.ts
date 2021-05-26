import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';

import { StorageService } from '../../services/storage.service';
import { RatingService } from '../../services/rating/rating.service';
import { Location } from "@angular/common";
import { MenuController, LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {

  isLoading = false;
  loginUserInfo: any;
  token: any;
  ratingList = [];

  constructor(
    private router: Router,
    private location: Location,
    public menuCtrl: MenuController,
    public ratingService: RatingService,
    public storageService: StorageService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.isLoading = true;

    this.getRatingList();
  }

  async getRatingList() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.loginUserInfo = await this.storageService.getObject(userinfo);
    this.token = this.loginUserInfo.token;


    const requestData = { token: this.token, id: this.loginUserInfo.user_id }

    this.ratingService.getRatingList(requestData).subscribe(result => {
      this.ratingList = result.rating_list;
      this.isLoading = false;
      loading.dismiss();
    },
      (err) => {
        this.isLoading = false;
        loading.dismiss();
        // this.presentAlert(err.error.msg);
      });
  }

  back() {
    this.location.back();
  }
  
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }

  ratingDetail(rating) {
    const navigationExtras: NavigationExtras = {
      state: { rating }
    }

    this.router.navigate(['/review-details'], navigationExtras)
  }

}
