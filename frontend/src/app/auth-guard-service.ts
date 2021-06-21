import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { IsAuthService }  from '../services/is-auth.service';

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private isAuth:IsAuthService,private router:Router){
    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
            if(this.isAuth.check){
                return true;
            }else{
                this.router.navigate(['/login']);
            }
    }
}