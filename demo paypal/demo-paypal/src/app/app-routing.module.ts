import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaypalComponent} from './paypal/paypal.component';

const routes: Routes = [
  {path:'paypal', component: PaypalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
