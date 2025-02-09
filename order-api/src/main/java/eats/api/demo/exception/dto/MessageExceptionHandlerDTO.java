package eats.api.demo.exception.dto;

public record MessageExceptionHandlerDTO(String timestamp,
                                         int status,
                                         String message) {
}