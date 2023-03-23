import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Title} from "@angular/platform-browser";
import {Category} from "../../entity/category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  category: Category[] = [];

  constructor(private produceService: ProductService,
              private title: Title) {
    this.title.setTitle("Danh mục sản phẩm")
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.produceService.getListCategory().subscribe(data => {
      this.category = data;
      console.log(data)
    })
  }
}
