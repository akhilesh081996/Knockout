import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProTablinksPage } from './pro-tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: ProTablinksPage,
    children: [
      {
        path: 'pro-home',
        loadChildren: () => import('../pro-home/pro-home.module').then(m => m.ProHomePageModule)
      },
      {
        path: 'pro-services',
        loadChildren: () => import('../pro-services/pro-services.module').then(m => m.ProServicesPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: 'pro-profile',
        loadChildren: () => import('../pro-profile/pro-profile.module').then(m => m.ProProfilePageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../contact-us/contact-us.module').then(m => m.ContactUsPageModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('../privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
      },
      {
        path: 'terms-conditions',
        loadChildren: () => import('../terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
      },
      {
        path: 'video-archieve',
        loadChildren: () => import('../video-archieve/video-archieve.module').then(m => m.VideoArchievePageModule)
      },
      {
        path: 'video-player/:post_id',
        loadChildren: () => import('../video-player/video-player.module').then( m => m.VideoPlayerPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProTablinksPageRoutingModule { }
