package eats.api.demo.entities;

import eats.api.demo.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_order")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Double value;
    @Column(nullable = false)
    private OrderStatus status;
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Order(){}
}
