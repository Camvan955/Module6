import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from "./home/home.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,"myFile"),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
