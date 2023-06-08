import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs'
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
// export const loginGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn: 'root'
})

export class loginGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Guard logic here
    return this.loginService.isLoggedIn ? true : this.router.navigate(['/login']);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Guard logic here
    return this.loginService.isLoggedIn;
  }
}
