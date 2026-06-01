using Newtonsoft.Json;

namespace api.Dtos.Stock
{
    public class FinnhubSearchResponseDto
    {
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("result")]
        public List<FinnhubSearchResultDto> Result { get; set; } = [];
    }

    public class FinnhubSearchResultDto
    {
        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("displaySymbol")]
        public string DisplaySymbol { get; set; } = string.Empty;

        [JsonProperty("symbol")]
        public string Symbol { get; set; } = string.Empty;

        [JsonProperty("type")]
        public string Type { get; set; } = string.Empty;
    }
}
