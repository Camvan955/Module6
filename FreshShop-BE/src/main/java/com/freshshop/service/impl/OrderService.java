package com.freshshop.service.impl;

import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import com.freshshop.repository.IOrderDetailRepository;
import com.freshshop.repository.IOrderRepository;
import com.freshshop.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private IOrderRepository orderRepository;

    @Override
    public Optional<Orders> getOrderByIdAccount(Long idAccount) {
        return orderRepository.getOrderByIdAccount(idAccount);
    }

    @Override
    public void addOrder(Long idAccount) {
        orderRepository.addOrder(idAccount);
    }
}
