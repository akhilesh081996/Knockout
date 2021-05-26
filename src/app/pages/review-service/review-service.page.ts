import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { config } from 'src/app/config/config';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user/user.service';

const userinfo = config.USERINFO_STORAGE_KEY;

const stripe_key = 'pk_test_51HtrvsKY2u65BLBeU25OUqgTyqh4rzj4L1lZ2UmBqaS3mrWh9SYzG7rdimDienDlCOX0C1WklkeTuHPJlk8l53kK00TxWuI6KQ';


@Component({
  selector: 'app-review-service',
  templateUrl: './review-service.page.html',
  styleUrls: ['./review-service.page.scss']
})

export class ReviewServicePage implements OnInit {

  service_request;

  isSubmitting = false;
  isCompleted = false;
  currentUserId: any;

  token;
  card_lastnumber;

  user;

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private storageService: StorageService,
    private socket: Socket,
    private loadingController: LoadingController,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private stripe: Stripe,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.service_request = this.router.getCurrentNavigation().extras.state.pro_user
        console.log(this.service_request)
      }
    })

    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
      this.user = result
      this.socket.connect();
      this.card_lastnumber = result.card_number.substr(result.card_number.lastIndexOf(" ") + 1);
    });
  }

  async submitRequest() {
    this.isSubmitting = true;
    this.service_request.categoryId = '';
    this.service_request.token = this.token;
    this.service_request.from_user_id = this.currentUserId;
    this.creatCardToken()
    // this.createRequest();
  }

  async createRequest() {
    const loading = await this.loadingController.create({
      message: 'Creating request...',
    });
    await loading.present();

    this.userService.createRequest(this.service_request).subscribe((userprofileinfo) => {
      loading.dismiss();
      this.isSubmitting = false;
      this.isCompleted = true;

      this.presentAlert("Request sent successfully.");
      this.socket.emit('send-service-request-notification', this.service_request);

      setTimeout(() => {
        const navigationExtras: NavigationExtras = {
          state: { service_request: this.service_request }
        }
        this.router.navigate(['/service-confirmation'], navigationExtras)
      }, 1000)
    },
      (err) => {
        this.isSubmitting = false;
        this.loadingController.dismiss()
        this.presentAlert(err.error.msg);
      });
  }

  requestConfirmAlert() {
    this.alertController.create({
      header: 'Submit Request',
      message: 'Are you confirm to submit request?',
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Submit',
          handler: () => this.submitRequest()
        }
      ]
    }).then(res => {
      res.present();
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

  async creatCardToken() {

    const loading = await this.loadingController.create({
      message: 'Processing payment...',
    });
    await loading.present();

    this.stripe.setPublishableKey(stripe_key);
    var number = this.user.card_number.split(" ").join("");
    var expMonth = this.user.card_expiration_date.split('/')[0];
    var expYear = this.user.card_expiration_date.split('/')[2];
    var cvc = this.user.card_cvc;
    var cardDetails = {
      number: number,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc
    }
    this.stripe.createCardToken(cardDetails)
      .then(result => {
        const saveDetail = {
          token: this.user.token,
          stripe_token: result.id
        }
        this.saveStripeDetail({ ...saveDetail, ...cardDetails });
        this.makePayment(result.id, loading);
      }).catch(error => {
        console.error(error)
        this.presentAlert(error.message);
      });
  }

  async makePayment(card_token, loading) {
    const cardParams = {
      token: this.user.token,
      stripeToken: card_token,
      amount: this.service_request.service_price * 100,
      // currency_code: 'USD',
      to_user_id: this.service_request.to_user_id,
      service_name: this.service_request.service_name
    }

    this.paymentService.makePayment(cardParams).subscribe(data => {
      loading.dismiss();
      this.createRequest();
    }, (err) => {
      console.log('make payment error=====', err);
      loading.dismiss();
      this.presentAlert('Failed payment!');
    });
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

  goBack() {
    this.location.back()
  }

  public saveStripeDetail(stripeDetail) {
    this.paymentService.saveStripeDetail(stripeDetail).subscribe()
  }

}
