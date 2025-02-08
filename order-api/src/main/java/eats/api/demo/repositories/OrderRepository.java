package eats.api.demo.repositories;

import eats.api.demo.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query(value = "SELECT * FROM tb_order WHERE order_id = :id AND customer_id = :customerId", nativeQuery = true)
    Optional<Order> findByOrderIdAndCustomerId(Integer id, UUID customerId);

    @Query(value = "SELECT * FROM tb_order WHERE customer_id = :customerId", nativeQuery = true)
    List<Order> findByCustomerId(UUID customerId);
}
