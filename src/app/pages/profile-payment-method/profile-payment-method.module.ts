import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePaymentMethodPageRoutingModule } from './profile-payment-method-routing.module';

import { ProfilePaymentMethodPage } from './profile-payment-method.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePaymentMethodPageRoutingModule
  ],
  declarations: [ProfilePaymentMethodPage]
})
export class ProfilePaymentMethodPageModule {}
