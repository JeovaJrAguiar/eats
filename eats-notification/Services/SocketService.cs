using System.Net.Sockets;
using System.Net;
using System.Text;
using eats_notification.Interfaces;

namespace eats_notification.Services;

public class SocketService : ISocketServer
{
    private readonly int _port;
    private readonly GrpcService _gRPCService;
    private readonly TcpListener _tcpListener;

    public SocketService(GrpcService gRPCService)
    {
        _port = 5000;
        _gRPCService = gRPCService;
        _tcpListener = new TcpListener(IPAddress.Any, _port);
    }

    public void Start()
    {
        _tcpListener.Start();
        Task.Run(() => WaitingConnections());
    }

    private async Task WaitingConnections()
    {
        while (true)
        {
            TcpClient client = await _tcpListener.AcceptTcpClientAsync();
            _ = Task.Run(() => ProcessClient(client));
        }
    }

    private async Task ProcessClient(TcpClient client)
    {
        try
        {
            using NetworkStream stream = client.GetStream();
            byte[] buffer = new byte[1024];

            int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
            string messageReceived = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            string resposta = "Notificação recebida com sucesso!";
            byte[] respostaBytes = Encoding.UTF8.GetBytes(resposta);
            await stream.WriteAsync(respostaBytes, 0, respostaBytes.Length);

            _gRPCService.BroadcastMessage(messageReceived);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao processar cliente: {ex.Message}");
        }
        finally
        {
            client.Close();
        }
    }
}