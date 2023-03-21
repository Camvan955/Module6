import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from "./home/detail/detail.component";

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'product', loadChildren: () => import('./product/product.module').then(module => module.ProductModule)},
  {path: 'security', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
