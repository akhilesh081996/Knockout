import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { config } from 'src/app/config/config';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user/user.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  private isLoader;
  private user: any

  constructor(
    private location: Location,
    private userService: UserService,
    private storageService: StorageService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.user = await this.storageService.getObject(userinfo)
    this.getTermandCondition()
  }

  getTermandCondition() {

    this.showLoading()

    this.userService.getTermAndCondition(this.user.token).pipe(
      tap(res => {
        // this.presentAlert(res.msg)
      }),
      finalize(() => this.isLoader.dismiss())

    ).subscribe()

  }


  async showLoading() {
    this.isLoader = await this.loadingController.create({
      message: 'Loading...',
    });
    await this.isLoader.present();
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

  goBack() {
    this.location.back()
  }

}
