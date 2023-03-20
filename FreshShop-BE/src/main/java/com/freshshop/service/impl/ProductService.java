package com.freshshop.service.impl;

import com.freshshop.dto.ProductView;
import com.freshshop.entity.product.Product;
import com.freshshop.repository.IProductRepository;
import com.freshshop.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;


    @Override
    public Page<Product> listNew(Pageable pageable) {
        return productRepository.listNew(pageable);
    }
}
