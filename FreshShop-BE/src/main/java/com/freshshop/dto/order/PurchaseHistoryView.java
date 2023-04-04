package com.freshshop.dto.order;

public interface PurchaseHistoryView {
    String getNameProduct();
    Integer getQuantity();
    String getDateOrder();
    Double getTotal();
    Integer getPrice();

}
