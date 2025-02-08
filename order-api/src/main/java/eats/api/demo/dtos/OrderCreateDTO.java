package eats.api.demo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderCreateDTO(@NotBlank String description,
                             @NotNull Double value) {
}
