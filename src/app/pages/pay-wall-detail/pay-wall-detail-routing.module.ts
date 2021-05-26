import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWallDetailPage } from './pay-wall-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PayWallDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayWallDetailPageRoutingModule {}
