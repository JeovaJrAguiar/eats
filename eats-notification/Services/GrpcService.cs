using Grpc.Core;
using NotificationServer;
using System.Collections.Concurrent;

namespace eats_notification.Services;

public class GrpcService : NotificationService.NotificationServiceBase
{
    private readonly ConcurrentDictionary<string, NotificationSubscriberService> _subscribers;

    public GrpcService()
    {
        _subscribers = new ConcurrentDictionary<string, NotificationSubscriberService>();
    }

    public override async Task SubscribeForNotifications(NotificationSubscription request, IServerStreamWriter<NotificationResponse> responseStream, ServerCallContext context)
    {
        var subscriber = new NotificationSubscriberService(responseStream);
        _subscribers.TryAdd(request.ClientId, subscriber);

        Console.WriteLine($"[gRPC] Cliente {request.ClientId} conectado para notificações.");

        try
        {
            while (!context.CancellationToken.IsCancellationRequested)
            {
                await Task.Delay(1000);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao enviar notificação: {ex.Message}");
        }
        finally
        {
            _subscribers.TryRemove(request.ClientId, out _);
            Console.WriteLine($"[gRPC] Cliente {request.ClientId} desconectado.");
        }
    }

    public void BroadcastMessage(string message)
    {
        foreach (var subscriber in _subscribers.Values)
        {
            subscriber.SendNotification(message).ConfigureAwait(false);
        }
    }
}

