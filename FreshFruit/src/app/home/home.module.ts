import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailComponent } from './detail/detail.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [BodyComponent, HeaderComponent, FooterComponent, DetailComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule
    ]
})
export class HomeModule { }
