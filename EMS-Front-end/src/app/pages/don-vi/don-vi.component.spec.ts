import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonViComponent } from './don-vi.component';

describe('DonViComponent', () => {
  let component: DonViComponent;
  let fixture: ComponentFixture<DonViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
