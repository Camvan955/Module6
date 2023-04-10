package com.freshshop.controller;

import com.freshshop.dto.product.BillDto;
import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.product.Category;
import com.freshshop.entity.product.Product;
import com.freshshop.service.impl.CategoryService;
import com.freshshop.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductRestController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<Page<ProductView>> getListNewProduct(@RequestParam(defaultValue = "") String search,
                                                               @PageableDefault(size = 3) Pageable pageable) {
        Page<ProductView> productPage;
        productPage = productService.pageBySearchProduct(search, pageable);
        if (productPage.isEmpty()) {
            return new ResponseEntity<>(productPage, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/by-id")
    public ResponseEntity<Page<ProductView>> getProductByCategory(@PageableDefault(size = 3) Pageable pageable, @RequestParam Integer id) {
        Page<ProductView> productViews = productService.pageProductByCategory(id, pageable);
        if (productViews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(productViews, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getCategoryOfProduct() {
        List<Category> categoryList = categoryService.categoryList();
        if (categoryList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/detail/{idProduct}")
    public ResponseEntity<?> getProductById(@PathVariable Integer idProduct) {
        Product product = productService.findProductById(idProduct).orElse(null);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{idProduct}")
    public ResponseEntity<?> deleteProductById(@PathVariable() Integer idProduct) {
        Product product = productService.findProductById(idProduct).orElse(null);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.removeProduct(idProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
