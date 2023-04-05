import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ShareService} from "../../service/authentication/share.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pageProduct: Product[] = [];
  hotProduct: Product[] = [];
  page: any;
  numberPage = 0;
  newPage = 0;
  product: Product = {idProduct: 0, price: 0, image: '', nameProduct: '', description: ''};
  totalPages = 0;
  size: number = 3;
  sizeBuy = 5;
  last: any;
  first: any;
  role: String = "";
  id = 0;
  name = '';
  search = '';
  cart: Cart = {
    idProduct: 0,
    nameProduct: '',
    price: 0,
    image: '',
    quantity: 0
  };
  idOrder = 0;

  constructor(private produceService: ProductService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private orderService: OrderService,
              private title: Title) {
    this.title.setTitle("Trang chủ");
    if (this.tokenStorageService.getToken()) {
      this.orderService.getOrderByIdAccount(parseInt(this.tokenStorageService.getIdAccount())).subscribe(next => {
        this.idOrder = next.idOrder;
      })
    }
    this.shareService.getClickEvent().subscribe(next => {
      this.role = this.getRole();
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
    window.scroll(0, 0);
    this.getProductBuyMore(this.sizeBuy);
    this.searchProductByName(this.size);
    this.role = this.getRole();
  }

  getProductBuyMore(newPage: number) {
    this.orderService.getListProductBuyMore(this.newPage).subscribe(next => {
      this.numberPage = next;
      if (next) {
        this.hotProduct = next.content;
        console.log(this.hotProduct, "new")
        this.newPage = next.number;
        this.sizeBuy = next.sizeBuy;
        this.totalPages = next.totalPages;
        this.first = next.first;
        this.last = next.last;
      }
    })
  }

  searchProductByName(size: number) {
    this.produceService.searchProductByName(this.search.trim(), size).subscribe(data => {
      this.page = data;
      if (data) {
        this.pageProduct = data.content;
        console.log(this.pageProduct, "list")
        this.numberPage = data.number;
        this.size = data.size;
        this.totalPages = data.totalPages;
        this.first = data.first;
        this.last = data.last;
      }
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Danh sách rỗng',
        showConfirmButton: true,
        timer: 1500,
      },)
    })
  }

  deleteProduct(idProduct: any) {
    this.produceService.removeProduct(idProduct).subscribe(data => {
      this.searchProductByName(this.size);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa sản phẩm thành công!',
        showConfirmButton: true,
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

  addToCart(idProduct: number, nameProduct: string) {
    if (this.tokenStorageService.isLogger()) {
      const qty = 1;
      this.orderService.addOrderDetailByIdOrder(this.idOrder, idProduct, qty).subscribe(data => {
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
        icon: 'warning',
        title: 'Vui lòng đăng nhập để mua hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  getItem(idProduct: number, nameProduct: string) {
    this.id = idProduct;
    this.name = nameProduct;
  }
}
