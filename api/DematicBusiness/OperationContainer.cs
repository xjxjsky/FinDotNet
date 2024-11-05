using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;


namespace api.DematicBusiness
{
    public class OperationContainer
    {
        public OperationContainer() { } // 无参数构造函数

        // Used for XML & JSON 's @ID will receive Plus like value
        [XmlAttribute("ID")]
        [JsonProperty("@ID")]
        public string OperationType { get; set; }

        // 用于 XML 和 JSON 的 Value , Values weill get ["2", "3"]
        [XmlElement("Value")]
        [JsonProperty("Value")]
        public List<string> Values { get; set; } = new();

        // 用于 XML 和 JSON 的嵌套操作, NestedOperation 属性会接收嵌套的 Operation 对象（Multiplication 和 ["4", "5"]
        [XmlElement("Operation")] // 确保这个属性名与 JSON 中的键名匹配
        [JsonProperty("Operation")]
        public OperationContainer NestedOperation { get; set; } // support single nested operation
        //public List<OperationContainer> NestedOperations { get; set; } = new(); // support multiple nested operations


        // Class's core method for converting JSON or XML data structures into corresponding Operation objects
        public Operation ToOperation()
        {
            // 调试输出整个容器
            Console.WriteLine($"Jay's OperationContainer: {JsonConvert.SerializeObject(this)}"); // 记录整个对象以提高可见性

            // 调试输出操作类型
            Console.WriteLine($"Jay's OperationType: '{OperationType}'");

            // 检查 OperationType 是否为空
            if (string.IsNullOrEmpty(OperationType))
            {
                throw new InvalidOperationException("OperationType Cannot be null or Null!");
            }

            // 根据操作类型创建相应的操作
            Operation operation = OperationType switch
            {
                "Plus" => new Addition(),
                "Multiplication" => new Multiplication(),
                _ => throw new InvalidOperationException($"Not Support this operation type: '{OperationType}'")
            };

            // 将字符串类型的值转换为 double 类型，并进行错误处理
            operation.Values = Values.Select(v =>
            {
                if (double.TryParse(v, out double value))
                {
                    return value;
                }
                throw new InvalidOperationException($"Cannot convert the value '{v}' to double.");
            }).ToList();

            // 处理单个嵌套操作
            if (NestedOperation != null)
            {
                operation.NestedOperations.Add(NestedOperation.ToOperation());
            }
                      
            // 处理多个嵌套操作
            // foreach (var nestedOperation in NestedOperations)
            // {
            //     operation.NestedOperations.Add(nestedOperation.ToOperation());
            // }


            return operation;
        }
    }
}

