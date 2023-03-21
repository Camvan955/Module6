package com.freshshop.controller;

import com.freshshop.dto.ProductView;
import com.freshshop.entity.product.Product;
import com.freshshop.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private ProductService productService;

    @Autowired

    @GetMapping("")
    public ResponseEntity<Page<ProductView>> getListNewProduct(@PageableDefault(page = 0, size = 3)Pageable pageable){
        Page<ProductView> productPage = productService.pageProduct(pageable);
        if (productPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }
}
