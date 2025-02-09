package eats.api.demo.services;

import eats.api.demo.exception.type.MessageInternalServerErrorException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class IntegrationService {
    @Value("${notification.module.host}")
    private String NOTIFICATION_HOST;
    @Value("${notification.module.port}")
    private int NOTIFICATION_PORT;

    private final ExecutorService executorService = Executors.newFixedThreadPool(1);

    public void startConnectionNotificationModule(String orderId, String status) {
        executorService.submit(() -> {
            try (Socket socket = new Socket(NOTIFICATION_HOST, NOTIFICATION_PORT);
                 OutputStream outputStream = socket.getOutputStream();
                 InputStream inputStream = socket.getInputStream()) {

                String notification = orderId + ":" + status;
                outputStream.write(notification.getBytes(StandardCharsets.UTF_8));
                outputStream.flush();

                byte[] buffer = new byte[1024];
                int bytesRead = inputStream.read(buffer);
                String response = new String(buffer, 0, bytesRead, StandardCharsets.UTF_8);

                // TODO: Salvar logs com lombok

            } catch (Exception ex) {
                throw new MessageInternalServerErrorException(ex.getMessage());
                // TODO: Salvar logs com lombok
            }
        });
    }
}
