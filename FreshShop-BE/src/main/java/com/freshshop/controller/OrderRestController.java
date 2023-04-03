package com.freshshop.controller;

import com.freshshop.dto.order.*;
import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import com.freshshop.service.impl.OrderDetailService;
import com.freshshop.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderRestController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/{idAccount}")
    public ResponseEntity<?> getOrderById(@PathVariable Long idAccount) {
        Orders orders = orderService.getOrderByIdAccount(idAccount).orElse(null);
        if (orders == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/order-detail")
    public ResponseEntity<?> getOrderDetailByIdAccountAndIdOrder(@RequestParam Long idAccount, @RequestParam Integer idProduct) {
        OrderDetail orderDetail = orderDetailService.getOrderDetailByIdOrderAndIdProduct(idAccount, idProduct).orElse(null);
        if (orderDetail == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("/list-order-detail/{idAccount}")
    public ResponseEntity<List<OrderDetailDto>> getListOrderDetail(@PathVariable("idAccount") Long idAccount) {
        List<OrderDetailDto> orderDetailList = orderDetailService.getOrderDetailByIdAccount(idAccount);
        if (orderDetailList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetailList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createOrder(@RequestBody OrdersDto ordersDto) {
        Orders orders = orderService.getOrderByIdAccount(ordersDto.getIdAccount()).orElse(null);
        if (orders == null) {
            orderService.addOrder(ordersDto.getIdAccount());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list-by-id-order/{idOrder}")
    public ResponseEntity<List<OrderDetailDto>> getListOrderDetailByIdOrder(@PathVariable("idOrder") Integer idOrder) {
        List<OrderDetailDto> orderDetailList = orderDetailService.getOrderDetailByIdOrder(idOrder);
        if (orderDetailList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetailList, HttpStatus.OK);
    }

    @PostMapping("/add-order-detail")
    public ResponseEntity<?> addOrderDetail(@RequestBody OrdersDetailAdd ordersDetailAdd) {
        List<OrderDetailDto> list = orderDetailService.getOrderDetailByIdOrder(ordersDetailAdd.getIdOrder());
        for (OrderDetailDto o : list) {
            if (o.getIdProduct().equals(ordersDetailAdd.getIdProduct())) {
                    orderDetailService.updateQuantity(ordersDetailAdd.getIdOrder(), ordersDetailAdd.getIdProduct(), ordersDetailAdd.getQuantity() + o.getQuantity());
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        orderDetailService.addOrderDetail(ordersDetailAdd.getIdOrder(), ordersDetailAdd.getIdProduct(), ordersDetailAdd.getQuantity());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> removeOrderDetail(@RequestParam Integer idOrder,@RequestParam Integer idProduct){
        orderDetailService.deleteOrderDetail(idOrder, idProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/total-pay/{idOrder}")
    public ResponseEntity<TotalPay> getTotalByIdOrder(@PathVariable("idOrder") Integer idOrder){
        TotalPay totalPay = orderDetailService.getTotal(idOrder);
        return new ResponseEntity<>(totalPay, HttpStatus.OK);
    }

    @PatchMapping("/payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody OrdersDetailAdd ordersDetailAdd){
       orderDetailService.updatePaymentStatus(ordersDetailAdd.getIdOrder(), ordersDetailAdd.getDateOrder());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
