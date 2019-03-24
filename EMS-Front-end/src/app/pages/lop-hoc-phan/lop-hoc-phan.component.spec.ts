import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LopHocPhanComponent } from './lop-hoc-phan.component';

describe('LopHocPhanComponent', () => {
  let component: LopHocPhanComponent;
  let fixture: ComponentFixture<LopHocPhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LopHocPhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
