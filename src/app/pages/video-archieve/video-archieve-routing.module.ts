import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoArchievePage } from './video-archieve.page';

const routes: Routes = [
  {
    path: '',
    component: VideoArchievePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoArchievePageRoutingModule {}
