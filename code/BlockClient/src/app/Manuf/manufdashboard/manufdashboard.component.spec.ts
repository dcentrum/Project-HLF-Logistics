import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufdashboardComponent } from './manufdashboard.component';

describe('ManufdashboardComponent', () => {
  let component: ManufdashboardComponent;
  let fixture: ComponentFixture<ManufdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
