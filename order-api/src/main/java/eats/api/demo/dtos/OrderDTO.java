package eats.api.demo.dtos;

import eats.api.demo.enums.OrderStatus;

public record OrderDTO(Integer id,
                       String description,
                       Double value,
                       OrderStatus status) {
}
