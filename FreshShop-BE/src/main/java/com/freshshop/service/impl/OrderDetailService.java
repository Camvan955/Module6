package com.freshshop.service.impl;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import com.freshshop.repository.IOrderDetailRepository;
import com.freshshop.service.IOrderDetailService;
import com.freshshop.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService implements IOrderDetailService {

    @Autowired
    private IOrderDetailRepository orderDetailRepository;


    @Override
    public Optional<OrderDetail> getOrderDetailByIdOrderAndIdProduct(Long idAccount, Integer idProduct) {
        return orderDetailRepository.getOrderDetailByIdOrderAndIdProduct(idAccount, idProduct);
    }

    @Override
    public List<OrderDetailDto> getOrderDetailByIdOrder(Integer idOrder) {
        return orderDetailRepository.getOrderDetailByIdOrder(idOrder);
    }
}
