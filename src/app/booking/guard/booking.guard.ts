import { CanDeactivateFn, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BookingComponent } from '../booking.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// export const bookingGuard: CanDeactivateFn<unknown> = (BookingComponent, currentRoute, currentState, nextState) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class bookingGuard implements CanDeactivate<unknown>{

  constructor(private snackBar: MatSnackBar) { }

  canDeactivate(
    component: BookingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.bookingForm.pristine) {
      return component.bookingForm.pristine;
    }
    else {
      this.snackBar.open('You have unsaved changes', 'DISMISS');
      return false;
    }

  }

}