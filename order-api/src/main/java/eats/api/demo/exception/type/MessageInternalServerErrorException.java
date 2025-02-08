package eats.api.demo.exception.type;

import eats.api.demo.exception.MessageException;

public class MessageInternalServerErrorException extends MessageException {

    public MessageInternalServerErrorException(){
        super();
    }

    public MessageInternalServerErrorException(String message) {
        super(message);
    }
}