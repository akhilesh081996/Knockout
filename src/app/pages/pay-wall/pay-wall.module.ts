import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayWallPageRoutingModule } from './pay-wall-routing.module';

import { PayWallPage } from './pay-wall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayWallPageRoutingModule
  ],
  declarations: [PayWallPage]
})
export class PayWallPageModule {}
