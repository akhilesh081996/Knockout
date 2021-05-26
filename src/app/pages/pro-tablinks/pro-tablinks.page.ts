import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pro-tablinks',
  templateUrl: './pro-tablinks.page.html',
  styleUrls: ['./pro-tablinks.page.scss'],
})
export class ProTablinksPage implements OnInit {


  constructor(
    private menuCtrl: MenuController
  ) { }

  ngOnInit() { }

  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.toggle('customMenu');
  }

}
