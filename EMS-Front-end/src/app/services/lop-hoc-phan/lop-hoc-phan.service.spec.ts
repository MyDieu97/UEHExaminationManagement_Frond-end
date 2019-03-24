import { TestBed } from '@angular/core/testing';

import { LopHocPhanService } from './lop-hoc-phan.service';

describe('LopHocPhanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LopHocPhanService = TestBed.get(LopHocPhanService);
    expect(service).toBeTruthy();
  });
});
