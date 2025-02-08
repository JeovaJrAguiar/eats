package eats.api.demo.exception;

import eats.api.demo.exception.dto.ErrorMessageDTO;
import eats.api.demo.exception.dto.MessageExceptionHandlerDTO;
import eats.api.demo.exception.type.MessageBadRequestException;
import eats.api.demo.exception.type.MessageInternalServerErrorException;
import eats.api.demo.exception.type.MessageNotFoundException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ExceptionHandlerController {

    private MessageSource messageSource;

    public ExceptionHandlerController(MessageSource message) {
        this.messageSource = message;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<ErrorMessageDTO> dto = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(err -> {
            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
            dto.add(new ErrorMessageDTO(message, err.getField()));
        });

        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> handleNotFoundException(MessageNotFoundException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(LocalDate.now().toString(), HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MessageBadRequestException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> handleBadRequestException(MessageBadRequestException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(LocalDate.now().toString(), HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MessageInternalServerErrorException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> handleInternalServerErrorException(MessageInternalServerErrorException exception){
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(LocalDate.now().toString(), HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<MessageExceptionHandlerDTO> handleDataIntegrityViolationException(DataIntegrityViolationException exception){
        String message;
        String causeMessage = exception.getMostSpecificCause().getMessage().toLowerCase();
        if (causeMessage.contains("duplicate entry")) {
            message = causeMessage.split("'")[1] +" já existe";
        } else if (causeMessage.contains("data too long")) {
            message = "O campo " + causeMessage.split("'")[1] + " excedeu o tamanho máximo permitido";
        } else {
            message = causeMessage;
        }
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(LocalDate.now().toString(), HttpStatus.BAD_REQUEST.value(), message);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageExceptionHandlerDTO> handleException(Exception exception) {
        MessageExceptionHandlerDTO error = new MessageExceptionHandlerDTO(LocalDate.now().toString(), HttpStatus.INTERNAL_SERVER_ERROR.value(), "Algo inesperado aconteceu");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}