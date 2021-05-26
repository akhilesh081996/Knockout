import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import * as UserActions from "../../actions/user.actions";
import { config } from '../../config/config';
import { AppState } from "../../reducers";

const baseUrl = config.api_baseUrl;
const authUrl = config.api_authUrl;

const NEW_FEATURED = 1;
const MOST_POPULAR = 2
const FEATURED_CATEGORY = 3;


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
  ) { }

  loadUserInfo(userInfo) {
    return this.http.post<any>(baseUrl + '/get_users', userInfo);

  }
  requestGetUserInfo(userinfo) {
    this.store.dispatch(new UserActions.RequestGetUserInfo(userinfo));
  }

  // getUserInfo() {
  //   return this.store.select(getUserInfoState);
  // }

  doLogin(value: any) {
    let credential = {
      username: value.email,
      password: value.password
    }
    return this.http.post<any>(authUrl, credential);
  }
  getProfile(token: any) {
    return this.http.post<any>(baseUrl + '/getProfile', { token: token });
  }
  updateProfile(value: any) {
    return this.http.post<any>(baseUrl + '/UpdateProfile', value);
  }

  uploadProfilePhoto(formData: FormData) {
    return this.http.post<any>(baseUrl + '/Update_profile_pic', formData);
  }

  resetPassword(value: any) {
    return this.http.post<any>(baseUrl + '/RetrivePassword', value);
  }
  createUser(value: any) {
    return this.http.post<any>(baseUrl + '/register', value);
  }

  getUsers(param: any) {
    return this.http.post<any>(baseUrl + '/get_users', param);
  }

  getNewFeatured(param: any) {
    return this.http.post<any>(baseUrl + '/get_users_new_featured', param);
  }

  getMostPopular(param: any) {
    return this.http.post<any>(baseUrl + '/get_users_mostpopular', param);
  }

  getFeaturedCategory(param: any) {
    return this.http.post<any>(baseUrl + '/get_users_featuredcategory', param);
  }

  createRequest(value: any) {
    return this.http.post<any>(baseUrl + '/create_request', value);
  }

  getServiceRequests(param: any) {
    return this.http.post<any>(baseUrl + '/get_request', param);
  }

  sendContactUsForm(params: any) {
    return this.http.post<any>(baseUrl + '/contact_us', params);
  }

  getAboutUsData(token: any) {
    return this.http.get<any>(baseUrl + '/about_us?token=' + token);
  }

  getPrivacyPolicy(token: any) {
    return this.http.get<any>(baseUrl + '/privacy_policy?token=' + token);
  }

  getTermAndCondition(token: any) {
    return this.http.get<any>(baseUrl + '/term_and_conditions?token=' + token);
  }
  
  getvideoServiceRequests(param: any) {
    return this.http.get<any>(baseUrl + '/get_videos', {params:{token:param.token}});
  }
}

