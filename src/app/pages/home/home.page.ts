import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';
const userinfo = config.USERINFO_STORAGE_KEY;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  pro_userlist = [];
  searchName = '';
  isLoading = false;
  isCategoryLoading = false;
  categorylist = [];
  selectedCategory: any;
  token: any;

  new_featured = []
  most_popular = []
  featured_category = []

  constructor(
    private router: Router,
    public userService: UserService,
    public storageService: StorageService,
    public menuCtrl: MenuController,
    private categoryService: CategoryService,
    public loadingController: LoadingController,
  ) { }

  ionViewWillEnter() {
    this.isCategoryLoading = true;
    this.selectedCategory = 0;
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token
      this.getCategoryList()
    });
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.isCategoryLoading = false;
      this.categorylist = categories;
      this.getProUsers();
      this.getMostPopular()
      this.getNewFeatured()
      this.getFeaturedCategory()
    },
      (err) => {
      });
  }


  getProUsers() {

    let param = {
      role: 'athlete',
      token: this.token,
      search_val: this.searchName,
      category: this.selectedCategory
    };
    this.isLoading = true;

    this.userService.getUsers(param).subscribe((pro_userlist) => {
      this.pro_userlist = pro_userlist;
      this.isLoading = false;
    },
      (err) => {
        this.isLoading = false;
        this.pro_userlist = [];
        //this.presentAlert(err.error.msg);
      });
  }

  getNewFeatured() {

    let param = {
      role: 'athlete',
      token: this.token,
      category: this.selectedCategory
    };

    this.userService.getNewFeatured(param).pipe(
      tap(userList => this.new_featured = userList),
      finalize(() => this.isLoading = false)
    )
      .subscribe()
  }

  getMostPopular() {

    let param = {
      role: 'athlete',
      token: this.token,
      category: this.selectedCategory
    };

    this.userService.getMostPopular(param).pipe(
      tap(userList => this.most_popular = userList),
      finalize(() => this.isLoading = false)
    )
      .subscribe()
  }


  getFeaturedCategory() {

    let param = {
      role: 'athlete',
      token: this.token,
      category: this.selectedCategory
    };

    this.userService.getFeaturedCategory(param).pipe(
      tap(userList => this.featured_category = userList),
      finalize(() => this.isLoading = false)
    )
      .subscribe()
  }

  searchInputChange(e) {
    var search_value = e.detail.value;
    this.searchName = search_value;
    setTimeout(() => {
      if (search_value == this.searchName) {
        this.getProUsers();
      }
    }, 1000)
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

  selectCategory(category) {
    this.isLoading = true
    this.selectedCategory = category.id;
    this.getProUsers();
  }

  selectService(value) {
    let navigationExtras: NavigationExtras = {
      state: {
        pro_user: value
      }
    };
    this.router.navigate(['/select-service'], navigationExtras);
  }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
