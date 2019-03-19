import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangVienComponent } from './giang-vien.component';

describe('GiangVienComponent', () => {
  let component: GiangVienComponent;
  let fixture: ComponentFixture<GiangVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiangVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiangVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
