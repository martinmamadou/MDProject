import { TestBed } from '@angular/core/testing';

import { ChallengeCategoryService } from './challenge-category.service';

describe('ChallengeCategoryService', () => {
  let service: ChallengeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
