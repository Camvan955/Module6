import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {CartComponent} from './cart/cart.component';
import {CategoryListComponent} from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [CartComponent, CategoryListComponent, ProductListComponent, PaymentComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule {
}
