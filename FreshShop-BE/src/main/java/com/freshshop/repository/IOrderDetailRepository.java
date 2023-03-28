package com.freshshop.repository;

import com.freshshop.dto.order.OrderDetailDto;
import com.freshshop.entity.order.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
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
            "where payment_status= false and o.id_order =:idOrder\n",
            countQuery = "select `fresh_shopp`.order_detail.id_product as idProduct,p.name_product as nameProduct, p.price, order_detail.quantity, p.image\n" +
            "from `fresh_shopp`.order_detail\n" +
            "join `fresh_shopp`.product p on p.id_product = order_detail.id_product\n" +
            "join `fresh_shopp`.orders o on o.id_order = order_detail.id_order\n" +
            "where payment_status= false and o.id_order =:idOrder\n", nativeQuery = true)
    List<OrderDetailDto> getOrderDetailByIdOrder(Integer idOrder);


}
