using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    // them extensions, viet rieng ra file nay thay vi viet chung vao 1 file startup.cs
    public static class ApplicationServiceExtensions
    {
        //su dung this : extension method
        // them ham AddApplicationServices() vao IServiceCollection
        // cach lam: tao 1 class static, method static, sd tu khoa this nhu ben duoi
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
