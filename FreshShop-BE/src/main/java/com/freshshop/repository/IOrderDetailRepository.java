package com.freshshop.repository;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.dto.order.PurchaseHistoryView;
import com.freshshop.dto.order.TotalPay;
import com.freshshop.dto.product.ProductView;
import com.freshshop.entity.order.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    @Query(value = "select * from fresh_shopp.order_detail where id_order = :idOrder and id_product=: idProduct", nativeQuery = true)
    Optional<OrderDetail> getOrderDetailByIdOrderAndIdProduct(@Param("id") Long idAccount, @Param("id") Integer idProduct);

    @Query(value = "select `fresh_shopp`.`order_detail`.id_product as idProduct,p.name_product as nameProduct, p.price, order_detail.quantity, p.image\n" +
            "from `fresh_shopp`.order_detail\n" +
            "join `fresh_shopp`.product p on p.id_product = order_detail.id_product\n" +
            "join `fresh_shopp`.orders o on o.id_order = order_detail.id_order\n" +
            "join `fresh_shopp`.account a on a.id_account = o.id_account\n" +
            "where payment_status= false and a.id_account= :idAccount",
            countQuery = "select `fresh_shopp`.`order_detail`.id_product as idProduct,p.name_product as nameProduct, p.price, order_detail.quantity, p.image\n" +
                    "from `fresh_shopp`.order_detail\n" +
                    "join `fresh_shopp`.product p on p.id_product = order_detail.id_product\n" +
                    "join `fresh_shopp`.orders o on o.id_order = order_detail.id_order\n" +
                    "join `fresh_shopp`.account a on a.id_account = o.id_account\n" +
                    "where payment_status= false and a.id_account= :idAccount", nativeQuery = true)
    List<OrderDetailDto> getOrderDetail(@Param("idAccount") Long idAccount);

    @Query(value = "select `fresh_shopp`.`order_detail`.id_product as idProduct,p.name_product as nameProduct, p.price, order_detail.quantity, p.image\n" +
            "from `fresh_shopp`.order_detail\n" +
            "join `fresh_shopp`.product p on p.id_product = order_detail.id_product\n" +
            "join `fresh_shopp`.orders o on o.id_order = order_detail.id_order\n" +
            "where payment_status= false and o.id_order=:idOrder", nativeQuery = true)
    List<OrderDetailDto> getOrderDetailByIdOrder(@Param("idOrder") Integer idOrder);

    @Modifying
    @Query(value = "insert into `fresh_shopp`.`order_detail`(id_order, id_product, quantity) " +
            "values(:idOrder, :idProduct, :quantity)", nativeQuery = true)
    void addOrderDetail(@Param("idOrder") Integer idOrder,
                        @Param("idProduct") Integer idProduct,
                        @Param("quantity") Integer quantity);

    @Modifying
    @Query(value = "update `fresh_shopp`.`order_detail` set quantity =:quantity where id_order=:idOrder and id_product=:idProduct", nativeQuery = true)
    void updateQuantity(@Param("idOrder") Integer idOrder,
                        @Param("idProduct") Integer idProduct,
                        @Param("quantity") Integer quantity);

    @Modifying
    @Query(value = "delete from `fresh_shopp`.`order_detail` where id_order=:idOrder and id_product=:idProduct", nativeQuery = true)
    void deleteOrderDetail(@Param("idOrder") Integer idOrder, @Param("idProduct") Integer idProduct);

    @Query(value = "select SUM(o.quantity* p.price) as totalPay, SUM(o.quantity) as totalQuantity from `fresh_shopp`.`order_detail` o join `fresh_shopp`.`product` p on p.id_product = o.id_product\n" + "where o.id_order=:idOrder", nativeQuery = true)
    TotalPay getTotal(@Param("idOrder") Integer idOrder);

    @Modifying
    @Query(value = "update `fresh_shopp`.`orders` set payment_status = true, date_order = :dateOrder where id_order=:idOrder", nativeQuery = true)
    void updatePaymentStatus(@Param("idOrder") Integer idOrder, @Param("dateOrder") String dateOrder);

    @Query(value = "select p.name_product as nameProduct,\n" +
            "       od.quantity,\n" +
            "       o.date_order as dateOrder,\n" +
            "       (od.quantity* p.price) as total, a.address\n" +
            "from `fresh_shopp`.`product` p\n" +
            "join `fresh_shopp`.`order_detail` od on p.id_product = od.id_product\n" +
            "join `fresh_shopp`.`orders` o on od.id_order = o.id_order\n" +
            "join `fresh_shopp`.`account` a on a.id_account = o.id_account\n" +
            "where payment_status = true and a.id_account= :idAccount\n" +
            "order by od.id_order desc", nativeQuery = true)
    Page<PurchaseHistoryView> pagePurchase(@Param("idAccount") Long idAccount, Pageable pageable);

    @Query(value = "select od.id_product as idProduct, image, name_product as nameProduct, price, sum(quantity) as totalQuantity\n" +
            "from `fresh_shopp`.product\n" +
            "join `fresh_shopp`.`order_detail` od on product.id_product = od.id_product\n" +
            "join `fresh_shopp`.`orders` o on o.id_order = od.id_order\n" +
            "group by `product`.id_product\n" +
            "order by totalQuantity desc", nativeQuery = true)
    Page<ProductView> getListProductBuyMore(Pageable pageable);
}
