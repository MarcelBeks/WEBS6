import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { FormsModule } from '@angular/forms';

describe('AuthenticationComponent', () => {
	let component: AuthenticationComponent;
	let fixture: ComponentFixture<AuthenticationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, FormsModule],
			declarations: [AuthenticationComponent],
			providers: [
				{ provide: AuthService, useClass: MockAuthService },
      ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthenticationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
