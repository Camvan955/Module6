import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../entity/cart";
import {Orders} from "../../entity/orders";
import {TotalPay} from "../../dto/total-pay";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL_ORDER = "http://localhost:8080/order"
  totalMoneyUSD: number | undefined;
  exchangeRate: number = 23482.44687;

  constructor(private httpClient: HttpClient) {
  }

  getCartList(idOrder: number): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.URL_ORDER + '/list-order-detail/' + idOrder);
  }

  getOrderDetailByIdAccount(idAccount: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.URL_ORDER + '/list-order-detail/' + idAccount);
  }

  addOrderByIdAccount(idAccount: number) {
    return this.httpClient.post(this.URL_ORDER + '/add', {idAccount: idAccount});
  }

  getOrderByIdAccount(idAccount: number): Observable<Orders>{
    return this.httpClient.get<Orders>(this.URL_ORDER + '/' + idAccount);
  }

  getListOrderDetailByIdOrder(idOrder: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.URL_ORDER + '/list-by-id-order/' + idOrder);
  }

  addOrderDetailByIdOrder(idOrder: number, idProduct: number, qty: number) {
    return this.httpClient.post(this.URL_ORDER + '/add-order-detail', {idOrder: idOrder, idProduct: idProduct, quantity: qty});
  }

  removeOrderDetail(idOrder: number, idProduct: number){
    return this.httpClient.delete(this.URL_ORDER + '/delete?idOrder='+ idOrder + '&idProduct=' + idProduct);
  }

  getTotalPay(idOrder: number): Observable<TotalPay>{
    return this.httpClient.get<TotalPay>(this.URL_ORDER+'/total-pay/'+ idOrder);
  }

  updatePaymentStatus(idOrder: number){
    return this.httpClient.patch(this.URL_ORDER + '/payment',  {idOrder: idOrder, dateOrder: new Date().toLocaleString()});
  }
}
