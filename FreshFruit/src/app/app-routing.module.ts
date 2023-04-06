import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from "./common/error/error.component";

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'product', loadChildren: () => import('./product/product.module').then(module => module.ProductModule)},
  {path: 'security', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'customer', loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
