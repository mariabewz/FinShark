using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FinnhubKey"] ?? _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={apiKey}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var stock = JsonConvert.DeserializeObject<FMPStock>(content);
                    if (stock != null)
                    {
                        var quoteResult = await _httpClient.GetAsync($"https://finnhub.io/api/v1/quote?symbol={symbol}&token={apiKey}");
                        if (quoteResult.IsSuccessStatusCode)
                        {
                            var quoteContent = await quoteResult.Content.ReadAsStringAsync();
                            var quote = JsonConvert.DeserializeObject<FMPQuote>(quoteContent);
                            stock.price = quote?.c ?? 0;
                        }

                        stock.symbol = string.IsNullOrWhiteSpace(stock.symbol) ? symbol.ToUpper() : stock.symbol;
                        return stock.ToStockFromFMP();
                    }
                    return null;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<FinnhubSearchResponseDto?> SearchStocksAsync(string query)
        {
            try
            {
                var apiKey = _config["FinnhubKey"] ?? _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://finnhub.io/api/v1/search?q={query}&token={apiKey}");

                if (!result.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<FinnhubSearchResponseDto>(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<FMPStock?> GetCompanyProfileAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FinnhubKey"] ?? _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={apiKey}");

                if (!result.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<FMPStock>(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<FMPQuote?> GetStockQuoteAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FinnhubKey"] ?? _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://finnhub.io/api/v1/quote?symbol={symbol}&token={apiKey}");

                if (!result.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<FMPQuote>(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
