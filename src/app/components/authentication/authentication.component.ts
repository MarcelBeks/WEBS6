import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
	public emailLogin: string;
	public passwordLogin: string;

	public nameRegister: string;
	public emailRegister: string;
	public passwordRegister: string;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	login() {
		this.authService.login(this.emailLogin, this.passwordLogin);
	}

	register() {
		this.authService.register(
			this.nameRegister,
			this.emailRegister,
			this.passwordRegister
		);
	}
}
