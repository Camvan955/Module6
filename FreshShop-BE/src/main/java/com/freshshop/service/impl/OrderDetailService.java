package com.freshshop.service.impl;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.dto.order.TotalPay;
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
    public List<OrderDetailDto> getOrderDetailByIdAccount(Long idAccount) {
        return orderDetailRepository.getOrderDetail(idAccount);
    }

    @Override
    public List<OrderDetailDto> getOrderDetailByIdOrder(Integer idOrder) {
        return orderDetailRepository.getOrderDetailByIdOrder(idOrder);
    }

    @Override
    public void addOrderDetail(Integer idOrder, Integer idProduct, Integer quantity) {
        orderDetailRepository.addOrderDetail(idOrder, idProduct, quantity);
    }

    @Override
    public void updateQuantity(Integer idOrder, Integer idProduct, Integer quantity) {
        orderDetailRepository.updateQuantity(idOrder, idProduct, quantity);
    }

    @Override
    public void deleteOrderDetail(Integer idOrder, Integer idProduct) {
        orderDetailRepository.deleteOrderDetail(idOrder, idProduct);
    }

    @Override
    public TotalPay getTotal(Integer idOrder) {
        return orderDetailRepository.getTotal(idOrder);
    }

    @Override
    public void updatePaymentStatus(Integer idOrder) {
        orderDetailRepository.updatePaymentStatus(idOrder);
    }

}
