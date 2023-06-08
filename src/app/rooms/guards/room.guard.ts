import { CanActivateChildFn, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';

// export const roomGuard: CanActivateChildFn = (childRoute, state) => {
//   return false;
// };
@Injectable({
  providedIn: 'root'
})

export class roomGuard implements CanActivateChild {
  constructor(private loginService: LoginService) { }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Guard logic here
    return this.loginService.isAdmin;
  }
}
