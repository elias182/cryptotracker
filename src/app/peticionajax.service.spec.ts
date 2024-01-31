import { TestBed } from '@angular/core/testing';

import { PeticionajaxService } from './peticionajax.service';

describe('PeticionajaxService', () => {
  let service: PeticionajaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionajaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
