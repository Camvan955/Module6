package com.freshshop.controller;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.entity.account.Account;
import com.freshshop.entity.order.OrderDetail;
import com.freshshop.entity.order.Orders;
import com.freshshop.entity.product.Product;
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

    @PostMapping("/add-order")
    public ResponseEntity<?> createOrder(@RequestParam Long idAccount){
        Orders orders = orderService.getOrderByIdAccount(idAccount).orElse(null);
        if (orders == null){
           orderService.addOrder(idAccount);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/order-detail")
    public ResponseEntity<?> getOrderDetailByIdAccountAndIdOrder(@RequestParam Long idAccount, @RequestParam Integer idProduct){
        OrderDetail orderDetail = orderDetailService.getOrderDetailByIdOrderAndIdProduct(idAccount, idProduct).orElse(null);
        if (orderDetail == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);
    }

    @GetMapping("/list-order-detail/{idOrder}")
    public ResponseEntity<List<OrderDetailDto>> getListOrderDetailByIdOrder(@PathVariable Integer idOrder){
        List<OrderDetailDto> orderDetailList = orderDetailService.getOrderDetailByIdOrder(idOrder);
        if (orderDetailList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDetailList, HttpStatus.OK);
    }
}
