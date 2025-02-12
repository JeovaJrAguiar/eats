namespace eats_notification.Interfaces;

public interface INotificationSubscriber
{
    Task SendNotification(string message);
}
