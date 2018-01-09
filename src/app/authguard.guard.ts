import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users/users.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate {
    
  constructor(private user:UsersService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.router.navigate(['/']);
    return this.user.getUserLoggedIn();
  }

  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  //   throw new Error('Method not implemented.');
  // }

}
