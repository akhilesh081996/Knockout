import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewServicePageRoutingModule } from './review-service-routing.module';

import { ReviewServicePage } from './review-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewServicePageRoutingModule
  ],
  declarations: [ReviewServicePage]
})
export class ReviewServicePageModule {}
