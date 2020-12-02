import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarComponent } from './menubar.component';
import { AuthService } from 'src/app/services/auth.service';
import { MockAuthService } from 'src/testbed/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenubarComponent', () => {
	let component: MenubarComponent;
	let fixture: ComponentFixture<MenubarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [MenubarComponent],
			providers: [
				{ provide: AuthService, useClass: MockAuthService },
      ]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MenubarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
