using Notification.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Notification.Services
{
    public class SocketServer : ISocketServer
    {
        private readonly int _porta;
        private readonly TcpListener _servidor;

        public SocketServer(int porta)
        {
            _porta = porta;
            _servidor = new TcpListener(IPAddress.Any, _porta);
        }

        public void Start()
        {
            _servidor.Start();
            Console.WriteLine($"[Servidor de Notificações] Rodando na porta {_porta}...");

            Task.Run(() => AguardarConexoes());
        }

        private async Task AguardarConexoes()
        {
            while (true)
            {
                TcpClient cliente = await _servidor.AcceptTcpClientAsync();
                _ = Task.Run(() => ProcessarCliente(cliente));
            }
        }

        private async Task ProcessarCliente(TcpClient cliente)
        {
            try
            {
                using NetworkStream stream = cliente.GetStream();
                byte[] buffer = new byte[1024];

                int bytesLidos = await stream.ReadAsync(buffer, 0, buffer.Length);
                string mensagemRecebida = Encoding.UTF8.GetString(buffer, 0, bytesLidos);

                Console.WriteLine($"[Servidor de Notificações] Notificação recebida: {mensagemRecebida}");

                // Enviar resposta
                string resposta = "Notificação recebida com sucesso!";
                byte[] respostaBytes = Encoding.UTF8.GetBytes(resposta);
                await stream.WriteAsync(respostaBytes, 0, respostaBytes.Length);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao processar cliente: {ex.Message}");
            }
            finally
            {
                cliente.Close();
            }
        }
    }
}
