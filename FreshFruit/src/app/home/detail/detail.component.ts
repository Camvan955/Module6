import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {Cart} from "../../entity/cart";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {ShareService} from "../../service/authentication/share.service";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  productt: Product = {idProduct: 0, price: 0, nameProduct: '', image: '', description: ''};
  cartt: Cart = {id: 0, price: 0, quantity: 0};
  cartList: Cart[] = [];
  quantity = 1;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private title: Title) {
    this.title.setTitle('Chi tiết sản phẩm');
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

  addToCard(item: Product) {
    if (this.tokenStorageService.getCart()) {
      this.cartList = this.tokenStorageService.getCart();
      if (item.idProduct != null) {
        this.cartt.id = item.idProduct;
      }
      this.cartt.nameProduct = item.nameProduct;
      this.cartt.imageProduct = item.image;
      this.cartt.price = item.price;
      if (this.tokenStorageService.checkExistName(item.nameProduct)) {
        this.tokenStorageService.upQuantityProduct(item.idProduct, this.cartList);
      } else {
        this.cartt.quantity = 1;
        this.cartList.push(this.cartt);
      }
      this.tokenStorageService.setCart(this.cartList);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm vào giỏ hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      if (item.idProduct != null) {
        this.cartt.id = item.idProduct;
      }
      this.cartt.nameProduct = item.nameProduct;
      this.cartt.imageProduct = item.image;
      this.cartt.price = item.price;
      this.cartt.quantity = 1;
      this.cartList.push(this.cartt);
      this.tokenStorageService.setCart(this.cartList);
      alert('Đã thêm sản phẩm ' + this.cartt.nameProduct + ' vào giỏ hàng.');
    }
  }
}
