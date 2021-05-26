import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoArchievePageRoutingModule } from './video-archieve-routing.module';

import { VideoArchievePage } from './video-archieve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoArchievePageRoutingModule
  ],
  declarations: [VideoArchievePage]
})
export class VideoArchievePageModule {}
