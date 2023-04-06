import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/authentication/token-storage.service';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router
              ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      Swal.fire('Bạn chưa đăng nhập,Vui lòng đăng nhập để tiếp tục.');
      this.router.navigateByUrl('/security/login');
      return false;
    }
  }

}
