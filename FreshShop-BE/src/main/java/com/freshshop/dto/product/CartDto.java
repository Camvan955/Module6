package com.freshshop.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDto {
    private Integer id;
    private String nameProduct;
    private Double price;
    private String imageProduct;
    private int quantity;

    @Override
    public String toString() {
        return "CartDto{" +
                "id=" + id +
                ", nameProduct='" + nameProduct + '\'' +
                ", price=" + price +
                ", imageProduct='" + imageProduct + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
