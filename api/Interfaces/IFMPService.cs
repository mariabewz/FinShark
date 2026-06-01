using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;

namespace api.Interfaces
{
    public interface IFMPService
    {
        Task<Stock?> FindStockBySymbolAsync(string symbol);
        Task<FinnhubSearchResponseDto?> SearchStocksAsync(string query);
        Task<FMPStock?> GetCompanyProfileAsync(string symbol);
        Task<FMPQuote?> GetStockQuoteAsync(string symbol);
    }
}
