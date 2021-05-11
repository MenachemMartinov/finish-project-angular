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
      if (!auth || !auth?.business || !auth?.manager) {
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
          this.router.createUrlTree(['/pageNotFund']);
          result = false;
        } else if (
          state.url === '/new-category' ||
          state.url === '/edit-category/:id' ||
          state.url === '/delete-category/:id'
        ) {
          if (auth?.manager) {
            result = true;
          } else {
            this.router.createUrlTree(['/pageNotFund']);
            result = false;
          }
        } else {
          result = true;
        }
      }
    });
    return result;
  }
}
