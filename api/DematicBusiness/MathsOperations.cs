using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace api.DematicBusiness
{

    // Parse the JSON Format
    public class JsonMathsOperations
    {
        [JsonProperty("Maths")]
        public MathsContainer Maths { get; set; } // 修改为 MathsContainer 以匹配 JSON 结构
    }

    public class MathsContainer
    {
        [JsonProperty("Operation")]
        public OperationContainer Operation { get; set; }
    }

    // Parse the XML Format
    [XmlRoot("Maths")]
    public class XmlMathsOperations
    {
        [XmlElement("Operation")]
        public OperationContainer Operation { get; set; } // XML 顶层结构解析
        //  public List<OperationContainer> Operations { get; set; } // 支持多个顶层操作
    }

}


/*=======================================================================================================================================================================*/

// [XmlRoot("Maths")]
// public abstract class MathsOperations // Note: this is abstract class; it has 2 subclasses: JsonMathsOperations & XmlMathsOperations
// {
//     public MathsOperations() { } // 无参数构造函数

//     [XmlElement("Operation")]
//     [JsonPropertyName("Operation")]
//     public OperationContainer Operation { get; set; }  // 将 Operations 改为单一的 Operation 对象; 第一步: JSON 数据会被解析到 MathsOperations 类的 Operation 属性上
// }

// /*
// ****************************************************************************************************************************************************************
// */

// // Parse the JSON Format
// public class JsonMathsOperations : MathsOperations
// {
//     [JsonPropertyName("Maths")]
//     public new OperationContainer Operation { get; set; } // 解析 JSON 顶层结构

// }

// // Parse the XML Format
// [XmlRoot("Maths")]
// public class XmlMathsOperations : MathsOperations
// {
//     [XmlElement("Operation")]
//     public OperationContainer Operation { get; set; } // 继承父类，如果需要，可以重写，但通常不需要
// }