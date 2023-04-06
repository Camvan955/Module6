import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {ShareService} from "../../service/authentication/share.service";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product = {idProduct: 0, price: 0, nameProduct: '', image: '', description: ''};
  idOrder = 0;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private title: Title,
              private orderService: OrderService) {
    this.title.setTitle('Chi tiết sản phẩm');
    this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
      this.idOrder = next.idOrder;
    })
    this.activatedRoute.paramMap.subscribe(next => {
      const id = parseInt(<string> next.get('id'));
      console.log(id);
      this.productService.getProductById(id).subscribe(next => {
        this.product = next;
      });
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  addToCart(idProduct: number, nameProduct: string, qty: string){
    if (this.tokenStorageService.isLogger()){
    this.orderService.addOrderDetailByIdOrder(this.idOrder, idProduct, parseInt(qty)).subscribe(data =>{
      this.shareService.sendClickEvent();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm ' + nameProduct + ' vào giỏ hàng',
        showConfirmButton: false,
        timer: 1000
      })
    })
  } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Vui lòng đăng nhập để mua hàng!',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }
}
