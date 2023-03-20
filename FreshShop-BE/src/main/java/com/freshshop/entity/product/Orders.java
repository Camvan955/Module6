package com.freshshop.entity.product;

import com.freshshop.entity.account.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_account")
    private Account account;

    @ManyToOne()
    @JoinColumn(name = "id_payment", nullable = false, referencedColumnName = "id_payment")
    private Payment payment;
}
