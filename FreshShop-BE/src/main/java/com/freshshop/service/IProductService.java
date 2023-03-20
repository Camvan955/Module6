package com.freshshop.service;

import com.freshshop.dto.ProductView;
import com.freshshop.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<Product> listNew(Pageable pageable);
}
