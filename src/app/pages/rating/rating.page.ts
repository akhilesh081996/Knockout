import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { config } from 'src/app/config/config';
import { StorageService } from 'src/app/services/storage.service';
import { RatingService } from '../../services/rating/rating.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  service_request: any;
  rating = 0;
  rating_readonly = false;
  validationsform: FormGroup;
  showSubmitBtn = false;
  ratingList = [];
  isLoading = false;

  token;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public ratingService: RatingService,
    private storageService: StorageService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
    })

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const navigationState = this.router.getCurrentNavigation().extras.state;
        this.service_request = {
          to_user_id: navigationState.to_user_id,
          request_id: navigationState.request_id
        }
      }
    })

    if (!this.service_request) {
      this.router.navigate(['/tablinks/home'])
      return;
    }

    this.validationsform = this.formBuilder.group({
      feedback_text: new FormControl('', Validators.compose([
        Validators.required
      ])),
      starRating: new FormControl()
    })
  }

  logRatingChange(rating) {
    this.rating = rating;

  }

  async tryProvideFeedback(value) {

    this.service_request['marks'] = this.rating;
    this.service_request['feedback_text'] = value.feedback_text;
    this.service_request.token = this.token
    const loading = await this.loadingController.create({
      message: 'Submitting...',
    });

    await loading.present();
    this.ratingService.submitFeedback(this.service_request).subscribe(resp => {
      loading.dismiss();
      this.presentAlert(resp.msg)
      setTimeout(() => this.router.navigate(['/tablinks/home']), 1000)
    },
      (err) => {
        loading.dismiss()
      })
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 800,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }

  back() {
    this.router.navigate(['tablinks/home'])
  }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
