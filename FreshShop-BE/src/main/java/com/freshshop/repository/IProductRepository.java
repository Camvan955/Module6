package com.freshshop.repository;

import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select id_product   as idProduct\n" +
            "     , name_product as nameProduct\n" +
            "     , price\n" +
            "     , image\n" +
            "     , flag_delete  as flagDelete\n" +
            "from `fresh_shop`.`product` where flag_delete = false order by id_product desc",
            nativeQuery = true)
    Page<ProductView> pageProduct(Pageable pageable);

    @Query(value = "select id_product as idProduct, " +
            "name_product as nameProduct, " +
            "price ,\n" +
            "image ,\n" +
            "flag_delete as flagDelete\n" +
            "from `fresh_shop`.`product`\n" +
            "where (name_product like concat('%', :search, '%')\n" +
            "and flag_delete = false) order by id_product desc", countQuery = "select id_product as idProduct, name_product as nameProduct, price ,\n" +
            "image ,\n" +
            "flag_delete as flagDelete\n" +
            "from `fresh_shop`.`product`\n" +
            "where (name_product like concat('%', :search, '%')\n" +
            "and flag_delete = false) order by id_product desc",
            nativeQuery = true)
    Page<ProductView> pageBySearchProduct(@Param("search") String search, Pageable pageable);

    @Query(value = "select * from fresh_shop.product where flag_delete= false and id_product=:idProduct", nativeQuery = true)
    Optional<Product> findProductById(@Param("idProduct") Integer idProduct);

    @Modifying
    @Query(value = "update `fresh_shop`.`product` set flag_delete = true where id_product = :idProduct", nativeQuery = true)
    void removeProduct(Integer idProduct);

    @Query(value = "select id_product as idProduct, name_product as nameProduct, price, image from `fresh_shop`.`product` where flag_delete = false and id_category = :id", nativeQuery = true)
    Page<ProductView> pageProductByCategory(@Param("id") Integer id, Pageable pageable);


}
