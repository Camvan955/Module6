package com.freshshop.repository;

import com.freshshop.dto.ProductView;
import com.freshshop.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {
@Query(value = "select * from `fresh_shop`.`product` order by id_product desc", nativeQuery = true)
    Page<Product> listNew(Pageable pageable);
}
