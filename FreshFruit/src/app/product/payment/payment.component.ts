import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {OrderService} from "../../service/order/order.service";
import Swal from "sweetalert2";
import {ShareService} from "../../service/authentication/share.service";
import {Title} from "@angular/platform-browser";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Router} from "@angular/router";
import {Orders} from "../../entity/orders";
import {SecurityService} from "../../service/authentication/security.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  idOrder = 0;
  idAccount = 0;
  // @ts-ignore
  order: Orders = {idOrder: 0};
  money = 0;
  totalPrice = 0;
  roles: string[] = [];
  nameCustomer: String = "";
  address: String = "";
  phoneNumber: String = "";
  email: String = "";

  constructor(private orderService: OrderService,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private title: Title,
              private securityService: SecurityService) {
    this.title.setTitle("Thanh toán");
    this.idAccount = parseInt(this.tokenStorageService.getIdAccount());
    this.shareService.getClickEvent().subscribe(next => {
      this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.idOrder = next.idOrder;
      })
    })
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.idOrder = next.idOrder;
      this.getPayment(this.idOrder);
      this.getInfoCustomer(this.idAccount);
    })
    this.roles = this.tokenStorageService.getRole();
  }

  getPayment(order: number) {
      this.orderService.getTotalPay(order).subscribe(data => {
        if (data) {
          this.totalPrice = data.totalPay;
          this.money = +(this.totalPrice / 23000).toFixed(2);
          this.paymentPaypal(this.money.toString());
        }
      })
  }

  paymentPaypal(money: string) {
    render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: money,
        onApprove: (details => {
          this.orderService.updatePaymentStatus(this.idOrder).subscribe(data => {
            if (this.roles[0] != 'ROLE_ADMIN'){
              this.orderService.addOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(
                next => {
                  this.shareService.sendClickEvent();
                }
              );
            }
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mua hàng thành công!',
                showConfirmButton: false,
                timer: 1500
              });
            this.router.navigateByUrl('/home');
            }
          )
        })
      })
  }

  getInfoCustomer(idAccount: number) {
    this.securityService.getInfoCustomer(idAccount).subscribe(data => {
      if (data) {
        // @ts-ignore
        this.account = data;
        // @ts-ignore
        this.nameCustomer = data.name;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.email= data.email;
      }
    })
  }

}
