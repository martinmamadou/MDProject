import { TestBed } from '@angular/core/testing';

import { EmergencyCategoryService } from './emergency-category.service';

describe('EmergencyCategoryService', () => {
  let service: EmergencyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
