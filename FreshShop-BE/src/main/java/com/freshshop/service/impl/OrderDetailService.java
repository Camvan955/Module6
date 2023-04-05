package com.freshshop.service.impl;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.dto.order.PaymentDto;
import com.freshshop.dto.order.PurchaseHistoryView;
import com.freshshop.dto.order.TotalPay;
import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import com.freshshop.repository.IOrderDetailRepository;
import com.freshshop.service.IOrderDetailService;
import com.freshshop.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public void updatePaymentStatus(Integer idOrder, String dateOrder) {
        orderDetailRepository.updatePaymentStatus(idOrder, dateOrder);
    }

    @Override
    public Page<PurchaseHistoryView> pagePurchase(Long idAccount, Pageable pageable) {
        return orderDetailRepository.pagePurchase(idAccount, pageable);
    }

    @Override
    public Page<ProductView> getListProductBuyMore(Pageable pageable) {
        return orderDetailRepository.getListProductBuyMore(pageable);
    }


}
