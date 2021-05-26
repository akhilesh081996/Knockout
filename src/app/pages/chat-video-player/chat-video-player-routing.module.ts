import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatVideoPlayerPage } from './chat-video-player.page';

const routes: Routes = [
  {
    path: '',
    component: ChatVideoPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatVideoPlayerPageRoutingModule {}
