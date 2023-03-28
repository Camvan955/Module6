package com.freshshop.dto.order;

public interface OrderDetailDto {
    Integer getIdProduct();
    String getNameProduct();
    Double getPrice();
    Integer getQuantity();
    String getImage();
}
