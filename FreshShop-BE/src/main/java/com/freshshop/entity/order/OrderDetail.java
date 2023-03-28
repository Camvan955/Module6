package com.freshshop.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.freshshop.entity.product.Product;
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
    @JsonBackReference
    @JoinColumn(name = "id_order", referencedColumnName = "id_order")
    private Orders orders;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_product", nullable = false, referencedColumnName = "id_product")
    private Product product;

    private Integer quantity;
}
