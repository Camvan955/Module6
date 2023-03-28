import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../entity/cart";
import Order = jasmine.Order;
import {Orders} from "../../entity/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL_ORDER = "http://localhost:8080/order"

  constructor(private httpClient: HttpClient) {
  }

  getCartList(idOrder: number): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.URL_ORDER + '/list-order-detail/' + idOrder);
  }

  getOrderByIdAccount(idAccount: number): Observable<Orders> {
    return this.httpClient.get<Orders>(this.URL_ORDER + '/' + idAccount);
  }

}
