import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerdashboardComponent } from './retailerdashboard.component';

describe('RetailerdashboardComponent', () => {
  let component: RetailerdashboardComponent;
  let fixture: ComponentFixture<RetailerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
