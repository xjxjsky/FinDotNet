using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class FMPStock
    {
        public string symbol { get; set; }
        public double price { get; set; }
        public double beta { get; set; }
        public int volAvg { get; set; }
        public long mktCap { get; set; }
        public double lastDiv { get; set; }
        public string range { get; set; }
        public double changes { get; set; }
        public string companyName { get; set; }
        public string currency { get; set; }
        public string cik { get; set; }
        public string isin { get; set; }
        public string cusip { get; set; }
        public string exchange { get; set; }
        public string exchangeShortName { get; set; }
        public string industry { get; set; }
        public string website { get; set; }
        public string description { get; set; }
        public string ceo { get; set; }
        public string sector { get; set; }
        public string country { get; set; }
        public string fullTimeEmployees { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public double dcfDiff { get; set; }
        public double dcf { get; set; }
        public string image { get; set; }
        public string ipoDate { get; set; }
        public bool defaultImage { get; set; }
        public bool isEtf { get; set; }
        public bool isActivelyTrading { get; set; }
        public bool isAdr { get; set; }
        public bool isFund { get; set; }
    }
}

/*
FMPStock

这个类是从外部 API（比如 FMP API）中获取股票信息时使用的外部数据模型。它直接反映了外部 API 返回的数据结构。

    例如，symbol 是股票代码，price 是股票价格，companyName 是公司名称，等等。

这个类会被用来处理从外部获取的股票信息，它包含了很多属性，反映了股票的详细信息（如价格、公司信息、市场信息等）。

用途：从外部 API 获取股票数据时的模型。它主要是用来接收外部股票 API 的返回数据。
总结：

    CreateStockRequestDto：用于创建新股票时发送的数据格式。
    FMPStock：用于从外部 API 获取的股票数据模型。
    StockDto：用于返回给客户端的股票详细信息。
    UpdateStockRequestDto：用于更新现有股票时发送的数据格式。

它们的共同作用是为了在客户端和服务器之间传输数据，确保数据格式正确、合理。
*/