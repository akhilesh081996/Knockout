import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { config } from '../../config/config';
import { StorageService } from '../../services/storage.service';
const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  token: any;
  videolist = [];
  isLoading = false;
  user: any;
  status = 'pending'
  requestList = [];
  requestListseriesdata = [];
  videoOpts;
  post_id: string;
  url;
  constructor(private location: Location,
    private videoPlayer: VideoPlayer,
    public storageService: StorageService,
    public loadingController: LoadingController,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) {

    this.post_id = this.activatedRoute.snapshot.paramMap.get('post_id')

  }

  ngOnInit() {
  }

  back() {
    this.location.back()
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

      for (let index = 0; index < result.list.length; index++) {

        if (result.list[index].post_id == this.post_id) {
          this.url = result.list[index].url;
          console.log(this.url, 'this.singlevideourl')


        }
        else {
          this.requestListseriesdata = result.list;
          console.log(this.requestListseriesdata,'this.requestListseriesdata')
        }
      }


      loading.dismiss();
    },
      (err) => {
        this.isLoading = false;
        loading.dismiss();
      })
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
