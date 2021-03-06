import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { LoadingController, MenuController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.page.html',
  styleUrls: ['./select-service.page.scss'],
})

export class SelectServicePage implements OnInit {
  pro_user: any;
  service_request: any;
  validationsform: FormGroup;
  primedate: any;
  isLivePost = false;
  token: any;
  card_number: any;
  card_lastnumber: any;
  isSubmitting = false;
  isCompleted = false;
  currentUserId: any;
  card_cvc: any;
  card_expiration_date: any;
  email: any;
  stripe_key = 'pk_test_51HtrvsKY2u65BLBeU25OUqgTyqh4rzj4L1lZ2UmBqaS3mrWh9SYzG7rdimDienDlCOX0C1WklkeTuHPJlk8l53kK00TxWuI6KQ';

  request_id: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private http: HttpClient,
    private stripe: Stripe,
    private socket: Socket,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pro_user = this.router.getCurrentNavigation().extras.state.pro_user;
      }
    });

    this.validationsform = this.formBuilder.group({
      question: new FormControl('', Validators.compose([
        Validators.required
      ])),

      service_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      // primedate: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      // primetime: new FormControl('', Validators.compose([
      //   Validators.required
      // ])),
      starRating: new FormControl()
    });

    this.primedate = new Date().toISOString();
    if (this.pro_user) {
      this.validationsform.setValue({
        service_name: '',
        // primedate: this.primedate,
        // primetime: this.primedate,
        question: '',
        starRating: [this.pro_user.rating]
      });
    }

  }

  addPayment() {
    let navigationExtras: NavigationExtras = {
      state: {
        pro_user: this.pro_user
      }
    }
    this.router.navigate(['/payment-method'], navigationExtras);
  }

  ionViewWillEnter() {
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
      this.email = result.user_email;
      this.card_number = result.card_number;
      this.card_cvc = result.card_cvc;
      this.request_id = result.user_id;
      this.card_expiration_date = result.card_expiration_date;
      this.currentUserId = result.user_id;
      this.card_lastnumber = this.card_number.substr(this.card_number.lastIndexOf(" ") + 1);
      this.socket.connect();
    });
  }

  next(value) {

    this.service_request = this.pro_user;
    this.service_request.request_type = this.isLivePost ? 'livepost' : 'nolivepost';
    this.service_request.isLivePost = this.isLivePost;
    this.service_request.request = value.question;
    this.service_request.primedate = this.primedate;
    this.service_request.service_name = value.service_name;
    this.service_request.to_user_id = this.service_request.user_id;
    if (this.isLivePost)
      this.service_request.service_price = this.service_request.service_price * 1.5;

    let navigationExtras: NavigationExtras = {
      state: { pro_user: this.pro_user }
    }

    if (this.card_number != undefined && this.card_number != '')
      this.router.navigate(['/review-service'], navigationExtras);
    else this.router.navigate(['/payment-method'], navigationExtras);
  }

  async creatCardToken() {
    if (!this.isValidDate(this.card_expiration_date)) {
      this.presentAlert("Invalid date format. ex: 01/29/2021");
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Processing payment...',
    });
    await loading.present();

    this.stripe.setPublishableKey(this.stripe_key);
    var number = this.card_number.split(" ").join("");
    var expMonth = this.card_expiration_date.split('/')[0];
    var expYear = this.card_expiration_date.split('/')[2];
    var cvc = this.card_cvc;
    var cardDetails = {
      number: number,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc
    }
    this.stripe.createCardToken(cardDetails)
      .then(result => {
        this.makePayment(result.id, loading);
      }).catch(error => {
        console.error(error)
        this.presentAlert(error.message);
      });
  }

  isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
      return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  async makePayment(card_token, loading) {

    this.http.post('http://knockout.betaplanets.com/stripeforapp/index.php', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      token: card_token,
      amount: this.pro_user.service_price * 100,
      currency_code: 'USD',
      email: this.email,
      request_name: "SR#" + this.service_request.from_user_id
    }).subscribe(data => {
      console.log(data);
      loading.dismiss();

      // this.createRequest();
    }, (err) => {
      console.log('make payment error=====', err);
      loading.dismiss();
      this.presentAlert('Failed payment!');
    });
  }

  onCheckLivePostChange(e) {
    this.isLivePost = e.detail.checked;
  }
  back() {
    this.location.back();
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
