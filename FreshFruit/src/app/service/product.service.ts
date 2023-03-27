import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./authentication/token-storage.service";
import {Cart} from "../entity/cart";
import {Product} from "../entity/product";
import {Category} from "../entity/category";

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

  searchProductByName(search: any, size: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_PRODUCT + '?' +'size=' +size + '&search=' + search );
  }

  getProductById(idProduct: number): Observable<Product> {
    return this.httpClient.get<Product>(this.URL_PRODUCT + "/detail/" + idProduct);
  }

  removeProduct(idProduct: number) {
    return this.httpClient.delete(this.URL_PRODUCT + "/delete/" + idProduct);
  }

  getListCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.URL_PRODUCT + "/category");
  }
}
