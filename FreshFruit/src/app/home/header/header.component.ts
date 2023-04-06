import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {SecurityService} from "../../service/authentication/security.service";
import {Router} from "@angular/router";
import {ShareService} from "../../service/authentication/share.service";
import Swal from "sweetalert2";
import {OrderService} from "../../service/order/order.service";
import {Account} from "../../entity/account";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: any;
  username = ''
  name = '';
  role: string = '';
  quantity = 0;
  idOrder = 0;
  customer : Account[] = [];
  constructor(private tokenStorageService: TokenStorageService,
              private securityService: SecurityService,
              private router: Router,
              private shareService: ShareService,
              private orderService: OrderService) {
    this.shareService.getClickEvent().subscribe(next => {
      this.role = this.getRole();
    })
    this.securityService.getIsLoggedIn().subscribe(next => {
      this.isLoggedIn = next;
    });
    this.securityService.getUserLoggedIn().subscribe(next => {
      this.user = next;
    });
    this.shareService.getClickEvent().subscribe(next => {
      this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.idOrder = next.idOrder;
        this.quantity = this.getTotalPay(this.idOrder);
      })
    })
  }

  getRole() {
    let roles = '';
    if (this.tokenStorageService.getRole()) {
      roles = this.tokenStorageService.getRole()[0];
    }
    return roles;
  }

  ngOnInit(): void {
    this.role = this.getRole();
    this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.idOrder = next.idOrder;
      // this.getTotalPay(this.idOrder);
      this.quantity = this.getTotalPay(this.idOrder);
    })
  }

  logout() {
    this.tokenStorageService.logout();
    this.securityService.setIsLoggedIn(null, false);
    this.router.navigateByUrl('home');
    this.quantity = 0;
    this.shareService.sendClickEvent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đăng xuất thành công!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  getTotalPay(idOrder: number) {
    this.orderService.getTotalPay(idOrder).subscribe(data => {
      if (data) {
        this.quantity = data.totalQuantity;
      }
    })
    return this.quantity;
  }

}
