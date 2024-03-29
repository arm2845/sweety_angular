import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserTypes} from "../../auth/constants/user-types";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class IsNotAdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.getUserType() !== UserTypes.admin) {
          return true;
        } else {
          this.router.navigate(['/dashboard/menu']);
          return false;
        }
    }

}
