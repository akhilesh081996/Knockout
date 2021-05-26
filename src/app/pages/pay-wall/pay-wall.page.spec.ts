import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayWallPage } from './pay-wall.page';

describe('PayWallPage', () => {
  let component: PayWallPage;
  let fixture: ComponentFixture<PayWallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayWallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
