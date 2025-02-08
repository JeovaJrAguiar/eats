package eats.api.demo.exception.type;

import eats.api.demo.exception.MessageException;

public class MessageNotFoundException extends MessageException {

    public MessageNotFoundException(){
        super();
    }

    public MessageNotFoundException(String message) {
        super(message);
    }
}