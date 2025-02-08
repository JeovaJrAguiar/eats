package eats.api.demo.controllers;

import eats.api.demo.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/login/{email}")
    public ResponseEntity login(@PathVariable String email) {
        try {
            return ResponseEntity.ok(customerService.getCustomerByEmail(email));
        } catch (Exception ex) {
            throw new UsernameNotFoundException("E-mail ou senha inválido");
        }
    }
}
