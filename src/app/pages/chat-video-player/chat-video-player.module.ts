import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatVideoPlayerPageRoutingModule } from './chat-video-player-routing.module';

import { ChatVideoPlayerPage } from './chat-video-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatVideoPlayerPageRoutingModule
  ],
  declarations: [ChatVideoPlayerPage]
})
export class ChatVideoPlayerPageModule {}
