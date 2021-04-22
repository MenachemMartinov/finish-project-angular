import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let result = false;
    this.authService.getCurrentUser$.subscribe((auth) => {
      if (!auth) {
        if (
          state.url === '/login' ||
          state.url === '/sign-up-business' ||
          state.url === '/sign-up-manager'
        ) {
          result = true;
        }
      }
      if (auth?._id) {
        if (
          state.url === '/login' ||
          state.url === '/sign-up-business' ||
          state.url === '/sign-up-manager'
        ) {
          result = false;
        } else {
          result = true;
        }
      }
    });
    return result;
  }
}
