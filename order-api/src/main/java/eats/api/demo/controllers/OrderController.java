package eats.api.demo.controllers;

import eats.api.demo.dtos.OrderCreateDTO;
import eats.api.demo.services.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity getAll() {
        return ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid OrderCreateDTO request) {
        return ResponseEntity.ok(orderService.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateStatusToCancelled(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.updateStatusToCancelled(id));
    }
}
