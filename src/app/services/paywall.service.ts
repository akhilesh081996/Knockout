import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config/config';
const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaywallService {

  constructor(private http: HttpClient) { }

  getPaywall(token) {
    return this.http.get<any>(baseUrl + '/get_paywall?token=' + token);
  }

  getSinglePaywall(token, postid) {
    return this.http.get<any>(`${baseUrl}/single_paywall_details?token=${token}&post_id=${postid}`);
  }

}
