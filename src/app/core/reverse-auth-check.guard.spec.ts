import { TestBed } from '@angular/core/testing';

import { ReverseAuthCheckGuard } from './reverse-auth-check.guard';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReverseAuthCheckGuard', () => {
  let guard: ReverseAuthCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				ReverseAuthCheckGuard,
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: Router, useClass: RouterTestingModule }
			],
    });
    guard = TestBed.inject(ReverseAuthCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
