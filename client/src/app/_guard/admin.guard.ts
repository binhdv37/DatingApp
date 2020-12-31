import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AcountService} from '../_services/acount.service';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AcountService, private toastr: ToastrService) {
  }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map (user => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')){
          return true;
        }
        this.toastr.error('you can not enter this area');
      })
    );
  }

}
