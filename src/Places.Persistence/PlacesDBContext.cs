using Microsoft.EntityFrameworkCore;
using Persistence.Models;

namespace Places.Persistence
{
    public class PlacesDBContext : DbContext
    {
        public PlacesDBContext(DbContextOptions<PlacesDBContext> options) : base(options) { }
        public DbSet<Place> Places { get; set; }

    }
}