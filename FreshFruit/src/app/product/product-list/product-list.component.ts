import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {ShareService} from "../../service/authentication/share.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";
import {OrderService} from "../../service/order/order.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageProduct: Product[] = [];
  page: any;
  numberPage: number = 0;
  product: Product = {idProduct: 0, price: 0, image: '', nameProduct: '', description: ''};
  totalPages = 0;
  size: number = 3;
  last: any;
  first: any;
  role: String = "";
  id = 0;
  name = '';
  search = '';
  idOrder = 0;

  constructor(private produceService: ProductService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService,
              private orderService: OrderService,
              private title: Title) {

    this.title.setTitle("Sản phẩm theo danh mục");
    this.shareService.getClickEvent().subscribe(next => {
      this.role = this.getRole();
    })
    this.activatedRoute.paramMap.subscribe(next => {
      this.id = parseInt(<string>next.get('id'));
      console.log(this.id)
      this.produceService.getProductListByCategory(this.id, this.size).subscribe(data => {
        this.product = data;
      })
    });
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
    this.searchProductByCategory(this.size);
    this.role = this.getRole();
  }

  searchProductByCategory(size: number) {
    this.produceService.getProductListByCategory(this.id, size).subscribe(data => {
      if (data) {
        this.pageProduct = data.content;
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

  searchProductByName(size: number) {
    this.produceService.searchProductByName(this.search.trim(), size).subscribe(data => {
      this.page = data;
      if(data){
        this.pageProduct = data.content;
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
      }, )
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

  addToCart(idProduct: number, nameProduct: string, s: string, price: number){
    if(this.tokenStorageService.isLogger()){
      const qty = 1;
      this.orderService.addOrderDetailByIdOrder(this.idOrder, idProduct, qty).subscribe(data =>{
        this.shareService.sendClickEvent();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đã thêm sản phẩm ' + nameProduct + ' vào giỏ hàng',
          showConfirmButton: false,
          timer: 1000
        })
      })}else {
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
