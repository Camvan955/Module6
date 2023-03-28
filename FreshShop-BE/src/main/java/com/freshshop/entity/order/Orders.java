package com.freshshop.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.freshshop.entity.account.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Integer idOrder;
    private String dateOrder;
    private Boolean paymentStatus;
    @Column(columnDefinition = "bit default false")
    private Boolean flagDelete;

    @ManyToOne()
    @JsonManagedReference
    @JoinColumn(name = "id_account", referencedColumnName = "id_account")
    private Account account;

    @OneToMany(mappedBy = "orders")
    @JsonBackReference
    private Set<OrderDetail> orderDetail;

}

