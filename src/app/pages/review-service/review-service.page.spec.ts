import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewServicePage } from './review-service.page';

describe('ReviewServicePage', () => {
  let component: ReviewServicePage;
  let fixture: ComponentFixture<ReviewServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
