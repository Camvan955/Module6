import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {OrderService} from "../../service/order/order.service";
import {ShareService} from "../../service/authentication/share.service";
import {SecurityService} from "../../service/authentication/security.service";
import {Account} from "../../entity/account";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  total = 0;
  idAccount = 0;
  idOrder = 0;
  role: String = "";
  quantity = 0;
  account: Account[] = [];
  nameCustomer: String = "";
  address: String = "";
  phoneNumber: String = "";
  email: String = "";
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private title: Title,
              private orderService: OrderService,
              private shareService: ShareService,
              private securityService: SecurityService) {
    this.title.setTitle("Giỏ hàng");
    this.idAccount = parseInt(this.tokenStorageService.getIdAccount());
    this.shareService.getClickEvent().subscribe(next => {
      this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.idOrder = next.idOrder;
        this.getTotalPay(this.idOrder);

      })
      this.getAllCart(this.idAccount);
      this.role = this.getRole();
      this.getInfoCustomer(this.idAccount);
    })
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.idOrder = next.idOrder;
      this.getTotalPay(this.idOrder);
    })
    if (this.tokenStorageService.getCart() == undefined) {
      this.cart.length = 0;
    } else {
      this.cart = this.tokenStorageService.getCart();
    }
    this.getAllCart(this.idAccount);
  }

  getAllCart(idAccount: number) {
    this.orderService.getOrderDetailByIdAccount(idAccount).subscribe(data => {
      // @ts-ignore
      this.cart = data;
      this.getInfoCustomer(idAccount);
    })
  }

  getTotalPay(idOrder: number) {
    this.orderService.getTotalPay(idOrder).subscribe(data => {
      if (data) {
        this.total = data.totalPay;
        this.quantity = data.totalQuantity;
      }
    })
    return this.quantity;
  }

  getInfoCustomer(idAccount: number) {
    this.securityService.getInfoCustomer(idAccount).subscribe(data => {
      if (data) {
        // @ts-ignore
        this.account = data;
        this.nameCustomer = data.name;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.email= data.email;
      }
    })
  }

  getRole() {
    let roles = '';
    if (this.tokenStorageService.getRole()) {
      roles = this.tokenStorageService.getRole()[0];
    }
    return roles;
  }

  removeOrderDetail(idOrder: number, idProduct: number) {
    this.orderService.removeOrderDetail(this.idOrder, idProduct).subscribe(data => {
      this.shareService.sendClickEvent();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã xóa sản phẩm khỏi giỏ hàng!',
        showConfirmButton: false,
        timer: 1000
      })
      this.ngOnInit();
      this.clear();
    })
  }


  clear() {
    this.cart = [];
    this.total = 0;
  }
}
