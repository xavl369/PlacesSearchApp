using Microsoft.EntityFrameworkCore;
using Places.Persistence;

namespace Places.App
{
    // Avoid Program.cs becomes to large
    // Mimic behaviour of old startup class
    public static class StartupExtensions
    {
        //For Service Registrations
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            // Add services to the container.
            builder.Services.AddControllersWithViews()
                            .AddRazorRuntimeCompilation();

            builder.Services.AddPersistenceServices(builder.Configuration);
            builder.Services.AddLogging();
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return builder.Build();

        }

        //For Middleware
        public static WebApplication ConfigurePipeline(this WebApplication app)
        {

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            return app;

        }

        //Deletes DbContext database and then apply the migrations, again
        //On every app run reset db entirely, for dev purposes 
        public static async Task MigrateDatabaseAsync(this WebApplication app)
        {

            using var scope = app.Services.CreateScope();
            try
            {
                var context = scope.ServiceProvider.GetService<PlacesDBContext>();
                if (context != null)
                {
                    await context.Database.EnsureDeletedAsync();
                    await context.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = app.Logger;
                logger.LogError(ex, "An error occurred while migrating the database.");
            }
        }
    }
}
