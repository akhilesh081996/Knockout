import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { config } from '../../config/config';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  user: any;
  isLoader;

  aboutUsContent;

  constructor(
    private location: Location,
    private storageService: StorageService,
    public userService: UserService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.user = await this.storageService.getObject(userinfo)
    this.getAboutUs()
  }

  getAboutUs() {
    this.showLoading()

    this.userService.getAboutUsData(this.user.token)
      .pipe(
        tap(res => {
          this.aboutUsContent = res
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
