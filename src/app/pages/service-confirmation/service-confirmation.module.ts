import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceConfirmationPageRoutingModule } from './service-confirmation-routing.module';

import { ServiceConfirmationPage } from './service-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceConfirmationPageRoutingModule
  ],
  declarations: [ServiceConfirmationPage]
})
export class ServiceConfirmationPageModule {}
