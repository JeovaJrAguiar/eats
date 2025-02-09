package eats.api.demo.services;

import eats.api.demo.dtos.CustomerCreateDTO;
import eats.api.demo.dtos.CustomerDTO;
import eats.api.demo.entities.Customer;
import eats.api.demo.exception.type.MessageBadRequestException;
import eats.api.demo.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomerService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return customerRepository.findByEmail(username)
                .orElseThrow(() -> new MessageBadRequestException("E-mail ou senha inválido"));
    }

    @Transactional(readOnly = true)
    public CustomerDTO get(){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new CustomerDTO(customer.getCustomerId(), customer.getName(), customer.getEmail());
    }

    @Transactional
    public CustomerDTO create(CustomerCreateDTO dto) {
        Optional<Customer> user = customerRepository.findByEmail(dto.email());
        if (user.isPresent())
            throw new MessageBadRequestException("Usuário já existe");

        user = Optional.of(new Customer());

        user.get().setName(dto.name());
        user.get().setEmail(dto.email());
        user.get().setPassword(passwordEncoder.encode(dto.password()));

        customerRepository.save(user.get());

        return new CustomerDTO(user.get().getCustomerId(), user.get().getName(), user.get().getEmail());
    }

    @Transactional
    public CustomerDTO update(CustomerCreateDTO dto) {
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        customer.setName(dto.name());
        customer.setEmail(dto.email());
        customer.setPassword(passwordEncoder.encode(dto.password()));

        customerRepository.save(customer);

        return new CustomerDTO(customer.getCustomerId(), customer.getName(), customer.getEmail());
    }

    @Transactional
    public void delete(){
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        customerRepository.delete(customer);
    }
}
