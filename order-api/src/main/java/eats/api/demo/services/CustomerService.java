package eats.api.demo.services;

import eats.api.demo.dtos.CustomerDTO;
import eats.api.demo.entities.Customer;
import eats.api.demo.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomerService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return customerRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("E-mail ou senha inválido"));
    }

    @Transactional(readOnly = true)
    public CustomerDTO getCustomerByEmail(String email) {
        Optional<Customer> user = customerRepository.findByEmail(email);
        if (user.isEmpty())
            throw new UsernameNotFoundException("Usuário não encontrado");

        return new CustomerDTO(user.get().getCustomerId(), user.get().getName(), user.get().getEmail());
    }
}
