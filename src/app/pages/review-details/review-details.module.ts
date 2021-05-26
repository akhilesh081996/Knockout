import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic5-star-rating';
import { ReviewDetailsPageRoutingModule } from './review-details-routing.module';
import { ReviewDetailsPage } from './review-details.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StarRatingModule,
    ReviewDetailsPageRoutingModule
  ],
  declarations: [ReviewDetailsPage]
})
export class ReviewDetailsPageModule { }
