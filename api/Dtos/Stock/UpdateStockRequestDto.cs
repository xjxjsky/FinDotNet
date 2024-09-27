using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class UpdateStockRequestDto
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
UpdateStockRequestDto

这个类是更新现有股票数据时使用的 DTO。它主要用在API 的更新操作（例如，PUT 请求）中，表示用户向服务器发送的更新股票数据的格式。

    和 CreateStockRequestDto 类似，包含了股票的符号、公司名称、购买价格、最近股息、行业和市值等信息。

它和 CreateStockRequestDto 的区别在于，UpdateStockRequestDto 是针对已有股票的更新操作，而 CreateStockRequestDto 是用来创建新股票的。

用途：用于客户端提交更新某个股票的请求，确保更新的数据格式正确。
总结：

    CreateStockRequestDto：用于创建新股票时发送的数据格式。
    FMPStock：用于从外部 API 获取的股票数据模型。
    StockDto：用于返回给客户端的股票详细信息。
    UpdateStockRequestDto：用于更新现有股票时发送的数据格式。

它们的共同作用是为了在客户端和服务器之间传输数据，确保数据格式正确、合理。

*/