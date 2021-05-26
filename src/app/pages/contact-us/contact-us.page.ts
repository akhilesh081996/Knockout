import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})

export class ContactUsPage implements OnInit {

  feedbackForm: FormGroup
  user: any;

  isLoader: any;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private location: Location,
    private storageService: StorageService,
    private loadingController: LoadingController,
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  async ngOnInit() {
    this.user = await this.storageService.getObject(userinfo)

    this.feedbackForm.patchValue({
      name: `${this.user.first_name} ${this.user.last_name}`,
      email: `${this.user.user_email}`
    })
  }

  submitFeedBack() {
    const formValue = this.feedbackForm.value;
    formValue.token = this.user.token

    this.showLoading()

    this.userService.sendContactUsForm(formValue).pipe(
      tap(res => {
        this.presentAlert(res.msg)
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
