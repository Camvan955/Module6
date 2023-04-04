package com.freshshop.repository;

import com.freshshop.entity.order.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Transactional
public interface IOrderRepository extends JpaRepository<Orders, Integer> {

    @Query(value = "select * from `fresh_shopp`.orders " +
            "join `fresh_shopp`.account a on a.id_account = orders.id_account\n" +
            "where orders.payment_status = false and a.id_account= :id", nativeQuery = true)
    Optional<Orders> getOrderByIdAccount(@Param("id") Long idAccount);

    @Modifying
    @Query(value = "insert into `fresh_shopp`.orders(id_account, payment_status) values (:idAccount, false)", nativeQuery = true)
    void addOrder(@Param("idAccount") Long idAccount);



}
