import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';

const payment_url = config.payment_baseUrl;
const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  creatNewAccount(param: any) {
    return this.http.post<any>(baseUrl + '/add_connectAccount', param);
  }

  connectAccount() {
    return this.http.post<any>(payment_url + '/onboard-user', {});
  }

  getConnectAcounts(token) {
    return this.http.post<any>(baseUrl + '/get_connectedaccounts', { token: token });
  }

  getAccountInfo(accountId) {
    return this.http.post<any>(payment_url + '/get-accountinfo', { accountId: accountId });
  }

  creatPaymentIntent(param: any) {
    return this.http.post<any>(payment_url + '/create-payment-intent', param);
  }

  makePayment(param) {
    return this.http.post<any>(baseUrl + '/send_payment', param);
  }

  saveStripeDetail(param) {
    return this.http.post<any>(baseUrl + '/save_userstripe', param);
  }
}
