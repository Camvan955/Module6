import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from './customer.guard';

describe('TeacherGuard', () => {
  let guard: CustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
