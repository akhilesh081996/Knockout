import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewServicePage } from './review-service.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewServicePageRoutingModule {}
