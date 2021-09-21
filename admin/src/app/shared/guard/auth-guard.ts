import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'app/services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {


    constructor(private authservice: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authservice.userSession.pipe(map(user => {
            const isAuth =  !!user;
            if (isAuth) {
                return isAuth;
            }

            return this.router.createUrlTree(['/auth']);
        }));
    }
}