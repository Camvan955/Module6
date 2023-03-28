package com.freshshop.service;

import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IOrderService {

//    void addOrder(Orders orders);
//    List<OrderDetail> getCartByIdAccount(String id);
//    void addOrderDetail(OrderDetail orderDetail);
//    OrderDetail getOrderDetail(Integer id);

    Optional<Orders> getOrderByIdAccount(Long idAccount);

    void addOrder(@Param("idAccount") Long idAccount);

}
