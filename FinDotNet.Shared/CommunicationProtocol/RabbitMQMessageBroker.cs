using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinDotNet.Shared.CommunicationProtocol
{
    public class RabbitMQMessageBroker
    {
        private readonly IConnection connection;
        private readonly IModel channel;

        public RabbitMQMessageBroker()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare(queue: "alertQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);
        }

        public void SendMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchange: "", routingKey: "alertQueue", basicProperties: null, body: body);
        }

        public string ReceiveMessage()
        {
            var result = channel.BasicGet(queue: "alertQueue", autoAck: true);
            return Encoding.UTF8.GetString(result.Body.ToArray());
        }
    }
}
