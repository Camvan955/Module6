import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PRODUCT = 'http://localhost:8080/product'

  constructor(private httpClient: HttpClient) {
  }

  getListNewProduct(size: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_PRODUCT + '?' + 'size=' + size);
  }
}
