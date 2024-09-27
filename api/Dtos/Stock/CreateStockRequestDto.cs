using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class CreateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 over characters")]
        public string Symbol { get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = "Company Name cannot be over 10 over characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000000000)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "Industry cannot be over 10 characters")]
        public string Industry { get; set; } = string.Empty;
        [Range(1, 5000000000)]
        public long MarketCap { get; set; }


    }
}
/*
CreateStockRequestDto

这个类是创建新的股票数据时使用的 DTO。它主要用在API 的创建操作（例如，POST 请求）中，表示用户向服务器发送的数据格式。

    Symbol: 股票的符号，例如 AAPL、TSLA。
    CompanyName: 公司名称。
    Purchase: 购买的价格。
    LastDiv: 最近的股息。
    Industry: 公司所在的行业。
    MarketCap: 市值（公司的总价值）。

这个类使用了一些数据注解（例如 [Required]、[MaxLength]、[Range]），这些注解用于验证输入数据的正确性，比如确保股票符号长度不超过 10 个字符、购买价格在合理范围内等。

用途：用于客户端提交一个新的股票记录，确保提交的数据格式正确。
总结：

    CreateStockRequestDto：用于创建新股票时发送的数据格式。
    FMPStock：用于从外部 API 获取的股票数据模型。
    StockDto：用于返回给客户端的股票详细信息。
    UpdateStockRequestDto：用于更新现有股票时发送的数据格式。

它们的共同作用是为了在客户端和服务器之间传输数据，确保数据格式正确、合理。
*/