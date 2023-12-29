import { TestBed } from '@angular/core/testing';

import { AuthorizationPagesGuard } from './authorization-pages.guard';

describe('AuthorizationPagesGuard', () => {
  let guard: AuthorizationPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
