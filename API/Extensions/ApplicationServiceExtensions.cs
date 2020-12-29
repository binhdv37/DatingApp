using API.Data;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
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
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings")); // load cloudinary config
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            }); //tao 1 object dbContext

            return services;
        }
    }
}
