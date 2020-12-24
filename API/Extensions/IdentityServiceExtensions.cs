using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            //cau hinh authentication : validate user truoc khi truy cap tai nguyen
            //khi http request controller co [Authorize] ben tren => can dc authorize => logic ben duoi dc ap dung.
            //logic ben duoi chi de kiem tra xem token co hop le hay khong thoi.
            // token k hop le => tu dong returnn 401 unauthorize
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //khai bao key, khi user send token len, decode token, dung key kiem tra xem token co chinh xac k
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            return services;
        }
    }
}
