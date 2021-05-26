import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pay-wall-detail',
  templateUrl: './pay-wall-detail.page.html',
  styleUrls: ['./pay-wall-detail.page.scss'],
})
export class PayWallDetailPage implements OnInit {

  paywallDetail;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paywallDetail = this.router.getCurrentNavigation().extras.state.paywall;
      }
    });
  }

  back() {
    this.location.back()
  }

}
