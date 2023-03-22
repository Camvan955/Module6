import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  total = 0;
  length = 0;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private title: Title) {
    this.title.setTitle("Giỏ hàng")
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getCart() == undefined) {
      this.length = 0;
    } else {
      this.carts = this.tokenStorageService.getCart();
      this.total = this.getTotalPay();
      this.length = this.carts.length;
    }
  }

  getTotalPay() {
    for (let i = 0; i < this.carts.length; i++) {
      this.total += (this.carts[i].quantity * this.carts[i].price)
    }
    return this.total;
  }

  // buy() {
  //   if (this.tokenStorageService.isLogger()) {
  //     this.length = 0
  //     this.total = 0;
  //     this.carts = []
  //     this.tokenStorageService.clearCart();
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Thanh toán thành công ',
  //       showConfirmButton: false,
  //       timer: 2000
  //     });
  //
  //   } else {
  //     Swal.fire({
  //       title: "Bạn chưa đăng nhập!",
  //       text: "Hãy đăng nhập để tiến hành thanh toán!",
  //       icon: "warning",
  //       buttonsStyling: false,
  //       confirmButtonText: "Đăng nhập!",
  //       customClass: {
  //         confirmButton: "btn btn-primary"
  //       }
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.router.navigate(['/security'])
  //       }
  //     })
  //   }
  // }
}
