import {Component, OnInit} from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private produceService: ProductService,
              private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getNewProduct(this.size);
  }

  getNewProduct(size: number) {
    this.produceService.getListNewProduct(size).subscribe(data => {
      if (data != null) {
        console.log(data);
        this.pageProduct = data.content;
        console.log(this.pageProduct);
        this.numberPage = data.number;
        this.size = data.size;
        console.log(this.numberPage);
        this.totalPages = data.totalPages;
        this.first = data.first;
        this.last = data.last;
      }
    });
  }
}
