import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/config';
import { map } from 'rxjs/operators';

const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList() {
    return this.http.get<any>(baseUrl + '/get_categories');
  }

  getOtherCategories() {
    return this.http.get<any>(baseUrl + '/home_category_filter').pipe(
      map(res => res.other_category_list)
    )
  }
}
