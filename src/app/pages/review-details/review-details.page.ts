import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.page.html',
  styleUrls: ['./review-details.page.scss'],
})
export class ReviewDetailsPage implements OnInit, AfterViewInit {

  ratingDetail;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state)
        this.ratingDetail = this.router.getCurrentNavigation().extras.state.rating
    });
  }

  back() {
    this.location.back()
  }

}
