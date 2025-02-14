package eats.payments.services;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class PaymentServiceImpl extends UnicastRemoteObject implements PaymentService {

    public PaymentServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public String processPayment(String orderId, double amount) throws RemoteException {
        System.out.println("chamou a função: " + orderId + " no valor de R$ " + amount );
        return "Pagamento processado para o pedido: " + orderId + " no valor de R$ " + amount;
    }
}