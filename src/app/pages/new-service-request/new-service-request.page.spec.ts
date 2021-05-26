import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewServiceRequestPage } from './new-service-request.page';

describe('NewServiceRequestPage', () => {
  let component: NewServiceRequestPage;
  let fixture: ComponentFixture<NewServiceRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServiceRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewServiceRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
