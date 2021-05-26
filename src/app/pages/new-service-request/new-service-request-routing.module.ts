import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewServiceRequestPage } from './new-service-request.page';

const routes: Routes = [
  {
    path: '',
    component: NewServiceRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewServiceRequestPageRoutingModule {}
