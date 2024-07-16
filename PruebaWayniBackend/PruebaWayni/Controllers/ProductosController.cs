using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaWayni.Data;
using PruebaWayni.Models;

namespace PruebaWayni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDBContext _appDbContext;
        public ProductosController(AppDBContext appDBContext)
        {
            _appDbContext = appDBContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productos>>> GetProductos()
        {
            return await _appDbContext.Productos.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Productos>> GetProducto(int id)
        {
            var producto = await _appDbContext.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }
        [HttpPost]
        public async Task<IActionResult> AddProducto(Productos productos)
        {
            _appDbContext.Productos.Add(productos);
            await _appDbContext.SaveChangesAsync();
            return Ok(productos);
            
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProducto(int id, Productos producto)
        {
            if (id != producto.Id)
            {
                return BadRequest();
            }

            _appDbContext.Entry(producto).State = EntityState.Modified;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _appDbContext.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _appDbContext.Productos.Remove(producto);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
