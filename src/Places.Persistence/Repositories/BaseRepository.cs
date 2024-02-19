
using Microsoft.EntityFrameworkCore;
using Places.Persistence;
using Places.Persistence.Contracts;

namespace Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncRepository<T> where T : class
    {
        protected PlacesDBContext _context;

        public BaseRepository(PlacesDBContext context)
        {
            _context = context;
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public virtual async Task<T?> GetByIdAsync(string id)
        {
            T? t = await _context.Set<T>().FindAsync(id);
            return t;
        }

        public Task<IReadOnlyList<T>> GetPagedAsync(int page, int size)
        {
            throw new NotImplementedException();
        }
    }
}
