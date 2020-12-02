import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let spy: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthGuard,
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: Router, useClass: RouterTestingModule }
			],
		});
		guard = TestBed.inject(AuthGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
