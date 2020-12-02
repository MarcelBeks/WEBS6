import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
	let service: AuthService;

	const AngularFireAuthStub = {
		signInWithEmailAndPassword: (email, password) => { },
		createUserWithEmailAndPassword: (email, password) => { },
		signOut: () => { },
		authState: of({
			displayName: null,
			isAnonymous: true,
			uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
		})
	};
	
	const AngularFirestoreStub = {
		collection: (someString) => {}
  };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: AngularFireAuth, useValue: AngularFireAuthStub },
				{ provide: AngularFirestore, useValue: AngularFirestoreStub },
				{ provide: Router, useClass: RouterTestingModule }
      ]
		});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
