using System.Net.Sockets;
using System.Net;
using System.Text;

int porta = 5000;
TcpListener server = new(IPAddress.Any, porta);
server.Start();

while (true)
{
	TcpClient cliente = server.AcceptTcpClient();
	NetworkStream stream = cliente.GetStream();
	byte[] buffer = new byte[1024];

	int bytesRead = stream.Read(buffer, 0, buffer.Length);
	string messageReceived = Encoding.UTF8.GetString(buffer, 0, bytesRead);

	Console.WriteLine($"Notificação recebida: {messageReceived}");

	string response = "Notificação recebida com sucesso!";
	byte[] responseBytes = Encoding.UTF8.GetBytes(response);
	stream.Write(responseBytes, 0, responseBytes.Length);

	cliente.Close();
}