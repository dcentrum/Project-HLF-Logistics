import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDRSComponent } from './add-drs.component';

describe('AddDRSComponent', () => {
  let component: AddDRSComponent;
  let fixture: ComponentFixture<AddDRSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDRSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
