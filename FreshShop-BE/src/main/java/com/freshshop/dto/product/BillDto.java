package com.freshshop.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
public class BillDto {
    private Integer idAccount;
    private String dateOrder;
    private CartDto[] cartDtos;

    @Override
    public String toString() {
        return "BillDto{" +
                "idAccount=" + idAccount +
                ", dateOrder='" + dateOrder + '\'' +
                ", cartDtos=" + Arrays.toString(cartDtos) +
                '}';
    }
}
