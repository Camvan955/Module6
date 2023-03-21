import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ShareService} from "../../service/authentication/share.service";
import {TokenStorageService} from "../../service/authentication/token-storage.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pageProduct: Product[] = [];
  numberPage: number = 0;
  product: Product = {};
  totalPages = 0;
  size: number = 3;
  last: any;
  first: any;
  role: String = "";

  constructor(private produceService: ProductService,
              private  activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private tokenStorageService: TokenStorageService) {
  }

  getRole() {
    let roles = '';
    if (this.tokenStorageService.getRole()) {
      roles = this.tokenStorageService.getRole()[0];
      console.log(roles);
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
        console.log("aaaaa"+ data);
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
}
