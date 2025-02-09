using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Notification.Interfaces;
using Notification.Services;


var host = Host.CreateDefaultBuilder()
            .ConfigureServices((context, services) =>
            {
                services.AddSingleton<ISocketServer>(provider => new SocketServer(5000));
            })
            .Build();

var socketServer = host.Services.GetRequiredService<ISocketServer>();
socketServer.Start();

await host.RunAsync();