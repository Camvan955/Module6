package com.freshshop.service;

import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IProductService {

    Page<ProductView> pageProduct(Pageable pageable);
    Page<ProductView> pageBySearchProduct(@Param("search") String search, Pageable pageable);

    Optional<Product> findProductById( Integer idProduct);

    void removeProduct(Integer idProduct);

    Page<ProductView> pageProductByCategory(Integer id, Pageable pageable);


}
