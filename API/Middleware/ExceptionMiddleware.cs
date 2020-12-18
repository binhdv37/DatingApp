using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;


namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context) // dat ten ham dung, ten khac la loi
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message); //log error ra, kieu kieu log4j
                context.Response.ContentType = "application/json"; //set content type
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError; ///set status code

                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, "Internal server error");
                // kiem tra xem co phai trong moi truong development hay k.
                // dung => them phan stacktrace vao object response
                // sai => khong can in stack trace
                //dau ? : ney ex.StackTrace == null => k goi ham ToString nua => k co exception

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy =  JsonNamingPolicy.CamelCase // dua response ve chuan json (viet chu thuong cac properties)
                };

                //  json tra ve :
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }

    }
}
