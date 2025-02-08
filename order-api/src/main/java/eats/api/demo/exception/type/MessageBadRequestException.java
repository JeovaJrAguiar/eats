package eats.api.demo.exception.type;

import eats.api.demo.exception.MessageException;

public class MessageBadRequestException extends MessageException {

    public MessageBadRequestException(){
        super();
    }

    public MessageBadRequestException(String message) {
        super(message);
    }
}