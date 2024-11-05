using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DematicBusiness;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using api.DematicBusiness;
using System.Xml.Serialization;
using System.Xml.Serialization;
// using System.Text.Json.Serialization;
// using System.Text.Json;
using Newtonsoft.Json;



namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DematicCalculatorServiceController : ControllerBase
    {
        private readonly ICalculator _calculator;
        private readonly ILogger<DematicCalculatorServiceController> _logger;

        public DematicCalculatorServiceController(ICalculator calculator, ILogger<DematicCalculatorServiceController> logger)
        {
            _calculator = calculator;
            _logger = logger;
        }

        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] object data)
        {
            // _logger.LogInformation("Calculate method called");
            // _logger.LogInformation($"Received data: {data}");
            //api.Helpers.LogManager.Instance.Logger.Information($"api.Helpers.LogManager.Instance.Logger Received data: {data}");

            OperationContainer operationContainer;

            if (Request.ContentType == "application/json")
            {
                // Convert JSON data to a string for deserialization
                string jsonData = data.ToString();
                Console.WriteLine($"DematicCalculatorServiceController.Calculate Received JSON: {jsonData}");// 在反序列化之前，打印 JSON 数据以确认其格式

                // Parsing JSON data
                try
                {
                    // jsonData = @"{
                    //     'Maths': {
                    //         'Operation': {
                    //             '@ID': 'Plus',
                    //             'Value': ['2', '3'],
                    //             'Operation': {
                    //                 '@ID': 'Multiplication',
                    //                 'Value': ['4', '5']
                    //             }
                    //         }
                    //     }
                    // }";
                    // jsonData = @"{
                    //                     'Maths': {
                    //                         'Operation': {
                    //                             'ID': 'Plus',
                    //                             'Value': ['2', '3']
                    //                         }
                    //                     }
                    //                 }";

                    var jsonOperations = JsonConvert.DeserializeObject<JsonMathsOperations>(jsonData);
                    operationContainer = jsonOperations?.Maths?.Operation; // Adjust to access.Maths

                    /* Debug by Jay start*/
                    // if (operationContainer != null) // 使用 operationContainer 进行 null 检查
                    // {
                    //     Console.WriteLine("TopLayer OperationContainer Obj:");
                    //     Console.WriteLine(JsonConvert.SerializeObject(operationContainer, Formatting.Indented));

                    //     Console.WriteLine($"TopLayer OperationType: {operationContainer.OperationType}");

                    //     if (operationContainer.NestedOperation != null)
                    //     {
                    //         Console.WriteLine("Nested OperationContainer Obj:");
                    //         Console.WriteLine(JsonConvert.SerializeObject(operationContainer.NestedOperation, Formatting.Indented));
                    //         Console.WriteLine($"Nested OperationType: {operationContainer.NestedOperation.OperationType}");
                    //     }
                    // }
                    /* Debug by Jay end*/

                }
                catch (JsonException ex)
                {
                    _logger.LogError(ex, "Error deserializing JSON data.");
                    return BadRequest($"JSON deserialization error: {ex.Message}");
                }

            }
            else if (Request.ContentType == "application/xml")
            {
                // Parsing XML data
                var serializer = new XmlSerializer(typeof(XmlMathsOperations));
                using (var reader = new StringReader(data.ToString()))
                {
                    var xmlOperations = (XmlMathsOperations)serializer.Deserialize(reader);
                    operationContainer = xmlOperations?.Operation;
                }
            }
            else
            {
                return BadRequest("Unsupported content type. Please use application/json or application/xml.");
            }

            // Check whether the operationContainer is null
            if (operationContainer == null)
            {
                return BadRequest("operationContainer data is missing in the request.");
            }

            // if Parsing goes well, Starting Calculate
            try
            {
                // 执行计算
                var result = _calculator.Calculate(operationContainer.ToOperation());
                return Ok(new { Result = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during calculation.");
                return StatusCode(500, "An error occurred during calculation.");
            }
        }
    }

}
