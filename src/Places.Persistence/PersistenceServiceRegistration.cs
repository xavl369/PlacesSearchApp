using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;
using Places.Persistence.Contracts;
using Places.Persistence.Repositories;

namespace Places.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration) {

            services.AddDbContext<PlacesDBContext>(options => 
                options.UseSqlServer(configuration.GetConnectionString("PlacesApp"))
            );

            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IPlaceRepository, PlaceRepository>();

            return services;
        }
    }
}
