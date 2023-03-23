package com.freshshop.service.impl;

import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.product.Product;
import com.freshshop.repository.IProductRepository;
import com.freshshop.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;


    @Override
    public Page<ProductView> pageProduct(Pageable pageable) {
        return productRepository.pageProduct(pageable);
    }

    @Override
    public Optional<Product> findProductById(Integer idProduct) {
        return productRepository.findProductById(idProduct);
    }

    @Override
    public void removeProduct(Integer idProduct) {
        productRepository.removeProduct(idProduct);
    }

    @Override
    public Page<ProductView> pageProductByCategory(Integer idProduct, Pageable pageable) {
        return productRepository.pageProductByCategory(idProduct, pageable);
    }


}
