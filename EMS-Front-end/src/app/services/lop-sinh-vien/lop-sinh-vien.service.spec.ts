import { TestBed } from '@angular/core/testing';

import { LopSinhVienService } from './lop-sinh-vien.service';

describe('LopSinhVienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LopSinhVienService = TestBed.get(LopSinhVienService);
    expect(service).toBeTruthy();
  });
});
