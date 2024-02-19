using Persistence.Models;

namespace Places.Persistence.Contracts
{
    public interface IPlaceRepository : IAsyncRepository<Place>
    {
        public bool ExistPlace(string id);
    }
}
