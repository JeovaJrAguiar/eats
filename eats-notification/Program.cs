using eats_notification.Interfaces;
using eats_notification.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

builder.Services.AddSingleton<GrpcService>();
builder.Services.AddSingleton<ISocketServer, SocketService>();

var app = builder.Build();

app.MapGrpcService<GrpcService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

var socketServer = app.Services.GetRequiredService<ISocketServer>();
Task.Run(socketServer.Start);

app.Run();
