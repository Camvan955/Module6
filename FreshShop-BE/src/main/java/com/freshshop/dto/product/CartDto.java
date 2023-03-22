package com.freshshop.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cart {
    private Integer id;
    private String nameProduct;
    private String imageProduct;
    private int quantity;

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", nameProduct='" + nameProduct + '\'' +
                ", imageProduct='" + imageProduct + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
