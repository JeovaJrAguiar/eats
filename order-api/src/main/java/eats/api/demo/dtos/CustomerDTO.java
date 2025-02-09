package eats.api.demo.dtos;

import java.util.UUID;

public record CustomerDTO(UUID id,
                          String name,
                          String email) {
}
