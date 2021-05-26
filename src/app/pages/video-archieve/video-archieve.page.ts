import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-video-archieve',
  templateUrl: './video-archieve.page.html',
  styleUrls: ['./video-archieve.page.scss'],
})
export class VideoArchievePage implements OnInit {
  token: any;
  videolist = [];
  isLoading = false;
  user: any;
  status = 'pending'
  requestList = [];
  videoOpts;

  constructor(private location: Location,
    private videoPlayer: VideoPlayer,
    public storageService: StorageService,
    public loadingController: LoadingController,
    private userService: UserService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = await this.storageService.getObject(userinfo)
    this.getallvideoList()
  }

  async getallvideoList() {
    this.isLoading = true
    let param = {
      token: this.user.token
    };
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    console.log(param, 'param')
    this.userService.getvideoServiceRequests(param).subscribe((result) => {
      this.requestList = result.list;
      loading.dismiss();
    },
      (err) => {
        this.isLoading = false;
        loading.dismiss();
      })
  }

  back() {
    this.location.back()
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

}
