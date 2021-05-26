import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayWallDetailPageRoutingModule } from './pay-wall-detail-routing.module';

import { PayWallDetailPage } from './pay-wall-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayWallDetailPageRoutingModule
  ],
  declarations: [PayWallDetailPage]
})
export class PayWallDetailPageModule {}
