import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {OrderService} from "../../service/order/order.service";
import {ShareService} from "../../service/authentication/share.service";

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

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private title: Title,
              private orderService: OrderService,
              private shareService: ShareService) {
    this.title.setTitle("Giỏ hàng")
    this.idAccount = parseInt(this.tokenStorageService.getIdAccount());
    this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.idOrder = next.idOrder;
    })
    this.shareService.getClickEvent().subscribe(next => {
     this.getAllCart(this.idAccount);
    })
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getCart() == undefined) {
      this.cart.length = 0;
    } else {
      this.cart = this.tokenStorageService.getCart();
      // this.total = this.getTotalPay();
    }
    this.getAllCart(this.idAccount);
  }

  getAllCart(idAccount: number) {
    this.orderService.getOrderDetailByIdAccount(idAccount).subscribe(data => {
      console.log(data)
      // @ts-ignore
      this.cart = data;
      // @ts-ignore
      let arr: Cart[] = data;
      for (let i = 0; i < arr.length; i++) {
        this.total += (arr[i].quantity * arr[i].price);
      }
    })
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
    })
  }

}
