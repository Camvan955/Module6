package com.freshshop.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDetailAdd {
    private Integer idOrder;
    private Integer idProduct;
    private Integer quantity;
}
