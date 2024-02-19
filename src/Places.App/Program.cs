using Places.App;

var builder = WebApplication.CreateBuilder(args);

var app = builder.ConfigureServices()
                 .ConfigurePipeline();


await app.MigrateDatabaseAsync();

app.Run();
