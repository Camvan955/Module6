import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ShareService} from "../../service/authentication/share.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pageProduct: Product[] = [];
  numberPage: number = 0;
  product: Product = {idProduct: 0, price: 0, image: '', nameProduct: '', description: ''};
  totalPages = 0;
  size: number = 3;
  last: any;
  first: any;
  role: String = "";
  id = 0;
  name = '';

  cart: Cart = {
    id: 0,
    nameProduct: '',
    price: 0,
    imageProduct: '',
    quantity: 0
  };
  cartt: Cart[] = [];

  constructor(private produceService: ProductService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private title: Title) {
    this.title.setTitle("Trang chủ")

  }

  getRole() {
    let roles = '';
    if (this.tokenStorageService.getRole()) {
      roles = this.tokenStorageService.getRole()[0];
    }
    return roles;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getNewProduct(this.size);
    this.shareService.getClickEvent().subscribe(next => {
      this.role = this.getRole();
    })
  }

  getNewProduct(size: number) {
    this.produceService.getListNewProduct(size).subscribe(data => {
      if (data != null) {
        this.pageProduct = data.content;
        this.numberPage = data.number;
        this.size = data.size;
        this.totalPages = data.totalPages;
        this.first = data.first;
        this.last = data.last;
        this.shareService.sendClickEvent();
      }
    });
  }

  deleteProduct(idProduct: any) {
    this.produceService.removeProduct(idProduct).subscribe(data => {
      this.getNewProduct(this.size);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa sản phẩm thành công!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Xóa sản phẩm thất bại',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  addToCart(ids: number, images: string, names: string, prices: number) {
    if (this.tokenStorageService.getCart() != undefined) {
      this.cartt = this.tokenStorageService.getCart();
      this.cart.id = ids;
      this.cart.imageProduct = images;
      this.cart.nameProduct = names;
      this.cart.price = prices;
      if (this.tokenStorageService.checkExistId(ids)) {
        this.tokenStorageService.upQuantityProduct(ids, this.cartt)
      } else {
        this.cart.quantity = 1;
        this.cartt.push(this.cart);
      }
      this.tokenStorageService.setCart(this.cartt);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm ' + this.cart.nameProduct + ' vào giỏ hàng',
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      this.cart.id = ids;
      this.cart.imageProduct = images;
      this.cart.nameProduct = names;
      this.cart.price = prices;
      this.cart.quantity = 1;
      this.cartt.push(this.cart);
      this.tokenStorageService.setCart(this.cartt);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm ' + this.cart.nameProduct + ' vào giỏ hàng',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }

  getItem(idProduct: number, nameProduct: string) {
    this.id = idProduct;
    this.name = nameProduct;
  }
}
