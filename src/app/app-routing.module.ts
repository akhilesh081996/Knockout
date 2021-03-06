import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then(m => m.TablinksPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then(m => m.ServicePageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'pro-profile',
    loadChildren: () => import('./pages/pro-profile/pro-profile.module').then(m => m.ProProfilePageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./pages/service-request/service-request.module').then(m => m.ServiceRequestPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then(m => m.PaymentMethodPageModule)
  },
  {
    path: 'service-review',
    loadChildren: () => import('./pages/service-review/service-review.module').then(m => m.ServiceReviewPageModule)
  },
  {
    path: 'service-history',
    loadChildren: () => import('./pages/service-history/service-history.module').then(m => m.ServiceHistoryPageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./pages/service-details/service-details.module').then(m => m.ServiceDetailsPageModule)
  },
  {
    path: 'forgotpwd',
    loadChildren: () => import('./pages/forgotpwd/forgotpwd.module').then(m => m.ForgotpwdPageModule)
  },
  {
    path: 'pro-tablinks',
    loadChildren: () => import('./pages/pro-tablinks/pro-tablinks.module').then(m => m.ProTablinksPageModule)
  },
  {
    path: 'pro-home',
    loadChildren: () => import('./pages/pro-home/pro-home.module').then(m => m.ProHomePageModule)
  },
  {
    path: 'pro-services',
    loadChildren: () => import('./pages/pro-services/pro-services.module').then(m => m.ProServicesPageModule)
  },
  {
    path: 'pro-service-details',
    loadChildren: () => import('./pages/pro-service-details/pro-service-details.module').then(m => m.ProServiceDetailsPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./pages/rating/rating.module').then(m => m.RatingPageModule)
  },
  {
    path: 'rating-list',
    loadChildren: () => import('./pages/rating-list/rating-list.module').then(m => m.RatingListPageModule)
  },
  {
    path: 'payout-view',
    loadChildren: () => import('./pages/payout-view/payout-view.module').then(m => m.PayoutViewPageModule)
  },
  {
    path: 'payout-process/:account_id',
    loadChildren: () => import('./pages/payout-process/payout-process.module').then(m => m.PayoutProcessPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'review-service',
    loadChildren: () => import('./pages/review-service/review-service.module').then(m => m.ReviewServicePageModule)
  },
  {
    path: 'select-service',
    loadChildren: () => import('./pages/select-service/select-service.module').then(m => m.SelectServicePageModule)
  },
  {
    path: 'new-service-request',
    loadChildren: () => import('./pages/new-service-request/new-service-request.module').then(m => m.NewServiceRequestPageModule)
  },
  {
    path: 'service-confirmation',
    loadChildren: () => import('./pages/service-confirmation/service-confirmation.module').then(m => m.ServiceConfirmationPageModule)
  },
  {
    path: 'video-archieve',
    loadChildren: () => import('./pages/video-archieve/video-archieve.module').then(m => m.VideoArchievePageModule)
  },
  {
    path: 'pay-wall',
    loadChildren: () => import('./pages/pay-wall/pay-wall.module').then(m => m.PayWallPageModule)
  },
  {
    path: 'pay-wall-detail',
    loadChildren: () => import('./pages/pay-wall-detail/pay-wall-detail.module').then(m => m.PayWallDetailPageModule)
  },
  {
    path: 'ratings',
    loadChildren: () => import('./pages/ratings/ratings.module').then(m => m.RatingsPageModule)
  },
  {
    path: 'review-details',
    loadChildren: () => import('./pages/review-details/review-details.module').then(m => m.ReviewDetailsPageModule)
  },
  {
    path: 'profile-payment-method',
    loadChildren: () => import('./pages/profile-payment-method/profile-payment-method.module').then(m => m.ProfilePaymentMethodPageModule)
  },
  {
    path: 'video-player/:post_id',
    loadChildren: () => import('./pages/video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  },
  {
    path: 'chat-video-player',
    loadChildren: () => import('./pages/chat-video-player/chat-video-player.module').then(m => m.ChatVideoPlayerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
