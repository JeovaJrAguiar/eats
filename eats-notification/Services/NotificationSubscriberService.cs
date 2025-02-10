using eats_notification.Interfaces;
using Grpc.Core;
using NotificationServer;

namespace eats_notification.Services;

public class NotificationSubscriberService : INotificationSubscriber
{
    private readonly IServerStreamWriter<NotificationResponse> _responseStream;

    public NotificationSubscriberService(IServerStreamWriter<NotificationResponse> responseStream)
    {
        _responseStream = responseStream;
    }

    public async Task SendNotification(string message)
    {
        try
        {
            await _responseStream.WriteAsync(new NotificationResponse { Message = message });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao enviar notificação para cliente: {ex.Message}");
        }
    }
}