import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LopSinhVienComponent } from './lop-sinh-vien.component';

describe('LopSinhVienComponent', () => {
  let component: LopSinhVienComponent;
  let fixture: ComponentFixture<LopSinhVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LopSinhVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LopSinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
