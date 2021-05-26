import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { EventsService } from 'angular4-events';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';

const userstorage_key = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  rowHeight: any;
  rowHeight1: any;
  validationsform: FormGroup;
  isLoading = false;

  constructor(
    public formBuilder: FormBuilder,
    public storageService: StorageService,
    public userService: UserService,
    public loadingController: LoadingController,
    public router: Router,
    private events: EventsService,
    public plt: Platform
  ) { }

  async ngOnInit() {
    this.rowHeight = this.plt.height() / 2 + 'px';
    this.rowHeight1 = this.plt.height() / 2 - 100 + 'px';
    this.validationsform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

    const user: any = await this.storageService.getObject(userstorage_key)

    if(!user) return
    if (user.role == "athlete")
      this.router.navigate(['/pro-tablinks/pro-home']);
    if (user.role == "customer")
      this.router.navigate(['/tablinks/home']);
  }

  async trySignin(value) {
    this.isLoading = true;
    this.userService.doLogin(value).subscribe((userinfo) => {
      this.isLoading = false;
      this.storageService.setObject(userstorage_key, userinfo);

      this.events.publish('role-change', userinfo.role)

      if (userinfo.role == "athlete")
        this.router.navigate(['/pro-tablinks/pro-home']);
      if (userinfo.role == "customer")
        this.router.navigate(['/tablinks/home']);
    },
      (err) => {
        console.log(err);
        this.isLoading = false;
        //this.presentAlert(err.error.code);

        this.presentAlert("Invalid login info.");
      });
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
}
