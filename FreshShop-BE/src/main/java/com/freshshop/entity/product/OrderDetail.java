package com.freshshop.entity.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order_detail")
    private Integer idOrderDetail;

    @ManyToOne
    @JoinColumn(name = "id_order",nullable = false, referencedColumnName = "id_order")
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false, referencedColumnName = "id_product")
    private Product product;

    private Integer quantity;
}
