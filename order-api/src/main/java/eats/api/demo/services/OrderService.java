package eats.api.demo.services;

import eats.api.demo.dtos.OrderCreateDTO;
import eats.api.demo.dtos.OrderDTO;
import eats.api.demo.entities.Customer;
import eats.api.demo.entities.Order;
import eats.api.demo.enums.OrderStatus;
import eats.api.demo.exception.type.MessageNotFoundException;
import eats.api.demo.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private IntegrationService integrationService;

    @Transactional(readOnly = true)
    public OrderDTO getById(Integer id){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Order> order = orderRepository.findByOrderIdAndCustomerId(id, customer.getCustomerId());
        if (order.isEmpty())
            throw new MessageNotFoundException("Pedido não encontrado");
        return new OrderDTO(order.get().getOrderId(), order.get().getDescription(), order.get().getValue(), order.get().getStatus());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getAll(){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Order> orders = orderRepository.findByCustomerId(customer.getCustomerId());
        return orders.stream().map(order -> new OrderDTO(order.getOrderId(), order.getDescription(), order.getValue(), order.getStatus())).toList();
    }

    @Transactional
    public OrderDTO create(OrderCreateDTO dto){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Order order = new Order();
        order.setCustomer(customer);
        order.setDescription(dto.description());
        order.setValue(dto.value());
        order.setStatus(OrderStatus.AWAITING_PAYMENT);
        orderRepository.save(order);

        integrationService.startConnectionNotificationModule(order.getOrderId().toString(), OrderStatus.AWAITING_PAYMENT.name());
        integrationService.startConnectionPaymentsModule();

        return new OrderDTO(order.getOrderId(), order.getDescription(), order.getValue(), order.getStatus());
    }

    @Transactional
    public OrderDTO updateStatusToCancelled(Integer id){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Order> order = orderRepository.findByOrderIdAndCustomerId(id, customer.getCustomerId());
        if (order.isEmpty())
            throw new MessageNotFoundException("Pedido não encontrado");

        order.get().setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order.get());

        integrationService.startConnectionNotificationModule(order.get().getOrderId().toString(), OrderStatus.CANCELLED.name());

        return new OrderDTO(order.get().getOrderId(), order.get().getDescription(), order.get().getValue(), order.get().getStatus());
    }
}
