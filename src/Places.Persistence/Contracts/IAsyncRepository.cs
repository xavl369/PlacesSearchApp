
namespace Places.Persistence.Contracts
{
    //Base Interface that contains Generic Methods on the Repository
    public interface IAsyncRepository<T> where T : class
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task DeleteAsync(T entity);
        Task<IReadOnlyList<T>> GetPagedAsync(int page, int size);
        Task<T?> GetByIdAsync(string id);
    }
}
