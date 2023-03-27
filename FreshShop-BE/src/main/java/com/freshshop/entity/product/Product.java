package com.freshshop.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Integer idProduct;
    private String code;
    private String nameProduct;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private Double price;
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    private Boolean flagDelete;
    private String origin;

    @ManyToOne()
    @JsonBackReference
    @JoinColumn(name = "id_category", nullable = false, referencedColumnName = "id_category")
    private Category category;


}
