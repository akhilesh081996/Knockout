import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceConfirmationPage } from './service-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceConfirmationPageRoutingModule {}
