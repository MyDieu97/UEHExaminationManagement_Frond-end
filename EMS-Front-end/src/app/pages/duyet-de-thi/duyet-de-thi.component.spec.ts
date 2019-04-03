import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetDeThiComponent } from './duyet-de-thi.component';

describe('DuyetDeThiComponent', () => {
  let component: DuyetDeThiComponent;
  let fixture: ComponentFixture<DuyetDeThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuyetDeThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuyetDeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
