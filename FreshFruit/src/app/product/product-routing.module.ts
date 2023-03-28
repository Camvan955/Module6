import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', component: CartComponent},
  {path: 'category', component: CategoryListComponent},
  {path: 'category/list-by-category/:id', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
