import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayWallDetailPage } from './pay-wall-detail.page';

describe('PayWallDetailPage', () => {
  let component: PayWallDetailPage;
  let fixture: ComponentFixture<PayWallDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWallDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayWallDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
