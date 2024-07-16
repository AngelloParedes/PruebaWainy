using Microsoft.EntityFrameworkCore;
using PruebaWayni.Models;

namespace PruebaWayni.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options): base(options) { }

        public DbSet<Productos> Productos { get; set; }
    }
}
