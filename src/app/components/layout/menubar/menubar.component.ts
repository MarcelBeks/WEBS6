import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-menubar',
	templateUrl: './menubar.component.html',
	styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	logout() {
		this.authService.logout();
		this.clickMenuItem();
	}

	clickMenuItem() {
		document.getElementById('check').click();
	}
}
