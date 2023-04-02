import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {OrderService} from "../../service/order/order.service";
import Swal from "sweetalert2";
import {ShareService} from "../../service/authentication/share.service";
import {Title} from "@angular/platform-browser";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Router} from "@angular/router";
import {Cart} from "../../entity/cart";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  idOrder = 0;
  idAccount = 0;
  cart: Cart[] = [];

  constructor(private orderService: OrderService,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private title: Title) {
    this.title.setTitle("Thanh toán");
    this.shareService.getClickEvent().subscribe(next => {
      this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.idOrder = next.idOrder;
      })
    })
    render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: '100.00',
        onApprove: (details => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mua hàng thành công!',
            showConfirmButton: false,
            timer: 1000
          })
          this.paymentCart();
        })
      })
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getAllCart(this.idAccount);
  }

  paymentCart() {
    this.orderService.updatePaymentStatus(this.idOrder).subscribe(() => {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mua hàng thành công!',
          showConfirmButton: false,
          timer: 1000
        }
      );
      this.ngOnInit();
      this.clear();
    })
  }

  getAllCart(idAccount: number) {
    this.orderService.getOrderDetailByIdAccount(idAccount).subscribe(data => {
      // @ts-ignore
      this.cart = data;
    })
  }

  clear() {
    this.cart = [];
  }
}
