import {Orders} from "./orders";
import {Product} from "./product";

export interface OrderDetail {
  idOrderDetail?: number;
  idOrder?: Orders;
  idProduct?: Product;
  quantity?: number;
}
