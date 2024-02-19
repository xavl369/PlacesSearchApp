using Persistence;
using Persistence.Models;
using Persistence.Repositories;
using Places.Persistence.Contracts;

namespace Places.Persistence.Repositories
{
    public class PlaceRepository : BaseRepository<Place>, IPlaceRepository
    {
        public PlaceRepository(PlacesDBContext context) : base(context) { }

        public bool ExistPlace(string id) {
            return _context.Places.Any(p => p.Id == id);
        }
    }
}
