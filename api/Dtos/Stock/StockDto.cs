using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;

namespace api.Dtos.Stock
{
    public class StockDto
    {
        
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        
        public decimal Purchase { get; set; }
        
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
        public List<CommentDto> Comments {get; set;}   

    }
}

/*
StockDto

这是标准的股票数据传输对象，通常用来在客户端和服务器之间传递股票详情信息。它在 API 的 GET 请求中使用，表示返回给客户端的股票数据格式。

    Id: 股票的唯一标识符。
    Symbol: 股票符号。
    CompanyName: 公司名称。
    Purchase: 购买的价格。
    LastDiv: 最近的股息。
    Industry: 公司所在的行业。
    MarketCap: 市值。
    Comments: 与这支股票相关的评论列表，使用的是 CommentDto（评论的传输对象）。

用途：用来返回给客户端的股票详情信息，例如当用户请求查看某只股票的详细信息时，API 会返回 StockDto 类型的数据。
总结：

    CreateStockRequestDto：用于创建新股票时发送的数据格式。
    FMPStock：用于从外部 API 获取的股票数据模型。
    StockDto：用于返回给客户端的股票详细信息。
    UpdateStockRequestDto：用于更新现有股票时发送的数据格式。

它们的共同作用是为了在客户端和服务器之间传输数据，确保数据格式正确、合理。
*/