using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(ILogger<ProductsController> logger, StoreContext context) : BaseApiController
{
    private readonly StoreContext _context = context;
    private readonly ILogger<ProductsController> _logger = logger;

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {  
        return Ok(await _context.Products.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    { 
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        return Ok(product);
    }
}