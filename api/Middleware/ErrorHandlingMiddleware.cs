using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Serilog;

namespace api.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // 记录异常
                Log.Error(ex, "An unhandled exception occurred.");

                // 返回错误响应
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";
                // await context.Response.WriteAsync(new
                // {
                //     StatusCode = context.Response.StatusCode,
                //     Message = "An unexpected error occurred. Please try again later."
                // }.ToString());

                // 创建错误响应对象
                var response = new
                {
                    StatusCode = context.Response.StatusCode,
                    Message = "An unexpected error occurred. Please try again later."
                };

                // 序列化错误响应为 JSON
                var jsonResponse = JsonSerializer.Serialize(response);

                // 写入响应
                await context.Response.WriteAsync(jsonResponse);
            }
        }
    }
}