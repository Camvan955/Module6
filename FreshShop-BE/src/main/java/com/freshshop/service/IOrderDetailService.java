package com.freshshop.service;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.entity.order.OrderDetail;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IOrderDetailService {
    Optional<OrderDetail> getOrderDetailByIdOrderAndIdProduct(@Param("id") Long idAccount,
                                                              @Param("id") Integer idProduct);

    List<OrderDetailDto> getOrderDetailByIdAccount(Long idAccount);

    List<OrderDetailDto> getOrderDetailByIdOrder(Integer idOrder);

    void addOrderDetail(Integer idOrder, Integer idProduct, Integer quantity);

    void updateQuantity(Integer idOrder, Integer idProduct, Integer quantity);

    void deleteOrderDetail(Integer idOrder,Integer idProduct);
}
