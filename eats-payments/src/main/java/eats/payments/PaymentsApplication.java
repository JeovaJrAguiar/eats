package eats.payments;

import eats.payments.services.PaymentService;
import eats.payments.services.PaymentServiceImpl;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class PaymentsApplication {
    public static void main(String[] args) {
        try {
            PaymentService service = new PaymentServiceImpl();
            PaymentService stub  = (PaymentService) UnicastRemoteObject
                    .exportObject((PaymentService) service, 0);
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("PaymentService", stub);

            System.out.println("Servidor de Pagamentos pronto...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}