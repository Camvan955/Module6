import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {Cart} from "../../entity/cart";
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
  productt: Product = {idProduct: 0, price: 0, nameProduct: '', image: '', description: ''};
  cartt: Cart = {idProduct: 0, price: 0, quantity: 0};
  cartList: Cart[] = [];
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
        this.productt = next;
      });
    });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  // addToCard(item: Product) {
  //   if (this.tokenStorageService.getCart()) {
  //     this.cartList = this.tokenStorageService.getCart();
  //     if (item.idProduct != null) {
  //       this.cartt.idProduct = item.idProduct;
  //     }
  //     this.cartt.nameProduct = item.nameProduct;
  //     this.cartt.image = item.image;
  //     this.cartt.price = item.price;
  //     if (this.tokenStorageService.checkExistId(item.idProduct)) {
  //       this.tokenStorageService.upQuantityProduct(item.idProduct, this.cartList);
  //     } else {
  //       this.cartt.quantity = 1;
  //       this.cartList.push(this.cartt);
  //     }
  //     this.tokenStorageService.setCart(this.cartList);
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Đã thêm sản phẩm vào giỏ hàng!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   } else {
  //     if (item.idProduct != null) {
  //       this.cartt.idProduct = item.idProduct;
  //     }
  //     this.cartt.nameProduct = item.nameProduct;
  //     this.cartt.image = item.image;
  //     this.cartt.price = item.price;
  //     this.cartt.quantity = 1;
  //     this.cartList.push(this.cartt);
  //     this.tokenStorageService.setCart(this.cartList);
  //     alert('Đã thêm sản phẩm ' + this.cartt.nameProduct + ' vào giỏ hàng.');
  //   }
  // }


  addToCart(idProduct: number, nameProduct: string, qty: string){
    if (this.tokenStorageService.isLogger()){
    this.orderService.addOrderDetailByIdOrder(this.idOrder, idProduct, parseInt(qty)).subscribe(data =>{
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
