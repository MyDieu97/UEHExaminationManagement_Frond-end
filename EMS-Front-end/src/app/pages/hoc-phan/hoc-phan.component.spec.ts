import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocPhanComponent } from './hoc-phan.component';

describe('HocPhanComponent', () => {
  let component: HocPhanComponent;
  let fixture: ComponentFixture<HocPhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocPhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
