import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePaymentMethodPage } from './profile-payment-method.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePaymentMethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePaymentMethodPageRoutingModule {}
