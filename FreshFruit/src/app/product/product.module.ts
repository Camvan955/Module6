import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {CartComponent} from './cart/cart.component';
import {CategoryListComponent} from './category-list/category-list.component';

@NgModule({
  declarations: [CartComponent, CategoryListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule {
}
