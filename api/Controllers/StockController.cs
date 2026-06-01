using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;
        private readonly IFMPService _fmpService;
        public StockController(ApplicationDBContext context, IStockRepository stockRepo, IFMPService fmpService)
        {
            _stockRepo = stockRepo;
            _context = context;
            _fmpService = fmpService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query is required");
            }

            var result = await _fmpService.SearchStocksAsync(query);

            if (result == null)
            {
                return StatusCode(503, "Unable to connect to Finnhub API");
            }

            return Ok(result);
        }

        [HttpGet("profile/{symbol}")]
        public async Task<IActionResult> GetCompanyProfile([FromRoute] string symbol)
        {
            var result = await _fmpService.GetCompanyProfileAsync(symbol);

            if (result == null)
            {
                return StatusCode(503, "Unable to connect to Finnhub API");
            }

            return Ok(result);
        }

        [HttpGet("quote/{symbol}")]
        public async Task<IActionResult> GetStockQuote([FromRoute] string symbol)
        {
            var result = await _fmpService.GetStockQuoteAsync(symbol);

            if (result == null)
            {
                return StatusCode(503, "Unable to connect to Finnhub API");
            }

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stocks = await _stockRepo.GetAllAsync(query);

            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();
            return Ok(stockDto);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stock = await _stockRepo.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stockModel = stockDto.ToStockFromCreateDTO();

            await _stockRepo.CreateAsync(stockModel);

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepo.UpdateAsync(id, updateDto);
            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var stockModel = await _stockRepo.DeleteAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
