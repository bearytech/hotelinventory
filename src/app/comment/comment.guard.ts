import { ActivatedRouteSnapshot, CanActivateFn, Resolve, RouterStateSnapshot } from '@angular/router';
import { Comments } from './comment';
import { CommentService } from './comment.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// export const commentGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: "root"
})

export class commentGuard implements Resolve<Comments[]>{

  constructor(private commenetService: CommentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Comments[] | Observable<Comments[]> | Promise<Comments[]> {
    return this.commenetService.getComments();
  }
}


