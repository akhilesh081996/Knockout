import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-chat-video-player',
  templateUrl: './chat-video-player.page.html',
  styleUrls: ['./chat-video-player.page.scss'],
})
export class ChatVideoPlayerPage implements OnInit {

  videUrl;

  videoOpts;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private videoPlayer: VideoPlayer,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.videUrl = this.router.getCurrentNavigation().extras.state.videUrl;
      }
    });
  }

  public Play(url) {
    console.log(url, 'url')
    this.videoOpts = { volume: 1.0 };
    this.videoPlayer.play(url).then(() => {
      window.open(url.currentSrc, "_system");
    }).catch(err => {
      console.log(err);
    });
  }

  back() {
    this.location.back()
  }

}
