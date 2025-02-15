package eats.api.demo.controllers;

import eats.api.demo.dtos.CustomerCreateDTO;
import eats.api.demo.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ResponseEntity get() {
        return ResponseEntity.ok(customerService.get());
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid CustomerCreateDTO request) {
        return ResponseEntity.ok(customerService.create(request));
    }

    @PutMapping
    public ResponseEntity update(@RequestBody @Valid CustomerCreateDTO request) {
        return ResponseEntity.ok(customerService.update(request));
    }

    @DeleteMapping
    public ResponseEntity delete() {
        customerService.delete();
        return ResponseEntity.noContent().build();
    }
}
