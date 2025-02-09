package eats.api.demo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CustomerCreateDTO(@NotBlank String name,
                                @NotBlank @Email String email,
                                @NotBlank String password) {
}
