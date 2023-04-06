import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/authentication/token-storage.service';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()) {
      const roles = this.tokenStorageService.getRole();
      if (roles.indexOf('ROLE_ADMIN') > - 1) {
        return true;
      }else {
        Swal.fire('Bạn chưa đăng nhập,Vui lòng đăng nhập để tiếp tục.');
        this.router.navigateByUrl('/error');
        return false;
      }
    } else {
      Swal.fire('Bạn chưa đăng nhập,Vui lòng đăng nhập để tiếp tục.')
      this.router.navigateByUrl('/error');
      return false;
    }
  }

}
