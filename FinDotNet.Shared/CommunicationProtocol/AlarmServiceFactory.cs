using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinDotNet.Shared.CommunicationProtocol
{
    internal class AlarmServiceFactory
    {
        public static IAlarmService CreateService(string protocol)
        {
            switch (protocol)
            {
                case "REST":
                    return new RestAlarmService();
                case "GraphQL":
                    return new GraphQLAlarmService();
                case "gRPC":
                    return new GRpcAlarmService();
                default:
                    throw new ArgumentException("Unknown protocol");
            }
        }
    }
}
