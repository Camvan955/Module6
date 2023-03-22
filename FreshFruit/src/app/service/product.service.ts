import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./authentication/token-storage.service";
import {Cart} from "../entity/cart";
import {Product} from "../entity/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PRODUCT = 'http://localhost:8080/product'

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getListNewProduct(size: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_PRODUCT + '?' + 'size=' + size);
  }

  getProductById(idProduct: number): Observable<Product>{
    return this.httpClient.get<Product>(this.URL_PRODUCT+ "/detail/"+ idProduct);
  }

  // sell(cart: Cart[]): Observable<any>{
  //   return this.httpClient.post<any>(this.URL_PRODUCT+ "/order", {idAccount: this.tokenStorageService.getIdAccount(), })
  // }
}
