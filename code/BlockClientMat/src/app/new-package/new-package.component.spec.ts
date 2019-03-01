import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPackageComponent } from './new-package.component';

describe('NewPackageComponent', () => {
  let component: NewPackageComponent;
  let fixture: ComponentFixture<NewPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
