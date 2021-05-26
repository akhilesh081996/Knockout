import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWallPage } from './pay-wall.page';

const routes: Routes = [
  {
    path: '',
    component: PayWallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayWallPageRoutingModule {}
