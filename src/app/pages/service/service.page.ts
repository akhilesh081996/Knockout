import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CategoryService } from '../../services/category/category.service';
import { Location } from '@angular/common';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  pro_userlist = [];
  searchName = '';
  isLoading = false;
  isCategoryLoading = false;
  categorylist = [];
  selectedCategory: any;
  token: any;

  constructor(
    public userService: UserService,
    private router: Router,
    public loadingController: LoadingController,
    public storageService: StorageService,
    private categoryService: CategoryService,
    public menuCtrl: MenuController,
    private location: Location
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.isCategoryLoading = true;
    this.selectedCategory = 0;
    this.storageService.getObject(userinfo).then((result: any) => {
      this.token = result.token;
      this.getCategoryList();

    });
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.isCategoryLoading = false;
      this.categorylist = categories;
      this.getProUsers();
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

  goBack() {
    this.location.back()
  }
}
