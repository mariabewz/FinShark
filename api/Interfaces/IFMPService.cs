using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;
using Newtonsoft.Json.Linq;

namespace api.Interfaces
{
    public interface IFMPService
    {
        Task<Stock?> FindStockBySymbolAsync(string symbol);
        Task<FinnhubSearchResponseDto?> SearchStocksAsync(string query);
        Task<FMPStock?> GetCompanyProfileAsync(string symbol);
        Task<FMPQuote?> GetStockQuoteAsync(string symbol);
        Task<JObject?> GetKeyMetricsAsync(string symbol);
        Task<JArray?> GetPeersAsync(string symbol);
        Task<JObject?> GetReportedFinancialsAsync(string symbol);
        Task<JArray?> GetFilingsAsync(string symbol);
    }
}
