import { TestBed } from '@angular/core/testing';

import { GiangVienService } from './giang-vien.service';

describe('GiangVienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiangVienService = TestBed.get(GiangVienService);
    expect(service).toBeTruthy();
  });
});
