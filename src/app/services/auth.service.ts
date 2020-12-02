import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user: firebase.User;
	public user$: Observable<User>

	constructor(
		public firebaseAuth: AngularFireAuth,
		public firestore: AngularFirestore,
		private router: Router
	) {
		firebaseAuth.authState.subscribe((user) => {
			this.user = user;
		});
		this.user$ = this.firebaseAuth.authState;
	}

	login(email, password) {
		this.firebaseAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then((value) => {
				this.router.navigate(['/']);
			})
			.catch((err) => {
				console.log('Something went wrong:', err.message);
			});
	}

	register(name, email, password) {
		this.firebaseAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then((value) => {
				value.user.updateProfile({
					displayName: name,
				});
				this.firestore
					.collection('users')
					.doc(value.user.uid)
					.set({ email, name });
				this.router.navigate(['/']);
			})
			.catch((err) => {
				console.log('Something went wrong:', err.message);
			});
	}

	logout() {
		this.firebaseAuth.auth.signOut();
		this.router.navigate(['/']);
	}
}
