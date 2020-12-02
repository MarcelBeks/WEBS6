import { take, map } from 'rxjs/operators';
import { User } from 'firebase';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      take(1),
      map((user: User) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/authentication'], { queryParams: { returnUrl: state.url }});
        return false;
      })
    )
  }
}