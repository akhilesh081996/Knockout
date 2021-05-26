import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoArchievePage } from './video-archieve.page';

describe('VideoArchievePage', () => {
  let component: VideoArchievePage;
  let fixture: ComponentFixture<VideoArchievePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoArchievePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoArchievePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
