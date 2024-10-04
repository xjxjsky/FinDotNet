using api.Data;
using api.Interfaces;
using api.Models;
using api.Repository;
using api.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
//using Azure.Identity;

//Minimal Hosting Model：在 .NET 8 中，WebApplication.CreateBuilder(args) 已经自动加载了 appsettings.json、appsettings.{Environment}.json 和环境变量。
//因此，无需手动配置 ConfigureAppConfiguration，除非有特定需求。
//环境特定的配置文件：确保项目根目录下有 appsettings.Development.json 和 appsettings.Production.json，这些文件将根据 ASPNETCORE_ENVIRONMENT 环境变量自动加载。
var builder = WebApplication.CreateBuilder(args); 

// 1. 配置服务 Set Services you need!

// 1.1 配置 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
         // 替换为你的前端 Static Web Apps URL, 配置了一个名为 "AllowFrontend" 的策略，允许来自指定前端 URL 的跨域请求
        policy.WithOrigins("https://witty-moss-0dca53900.5.azurestaticapps.net", 
        "http://localhost:5177",
        "http://localhost:3000"
        ) 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 1.2 添加控制器和 JSON 序列化配置 Add Controllers and JSON Serialization setting
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// 1.3 配置 Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "FinDotNet API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "请输入Bearer令牌，例如: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            { 
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 1.4 配置数据库上下文 Set DB Connection Context
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 1.5 配置 Identity
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
})
.AddEntityFrameworkStores<ApplicationDBContext>()
.AddDefaultTokenProviders();

// 1.6 配置 JWT 认证  Set JWT Authentication
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JWT"));

var jwtSettings = builder.Configuration.GetSection("JWT").Get<JwtSettings>();
var key = Encoding.UTF8.GetBytes(jwtSettings.SigningKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true
    };
});

// 1.7 注册依赖注入服务  Registering Dependency Injection Services
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
builder.Services.AddScoped<IFMPService, FMPService>();
builder.Services.AddHttpClient<IFMPService, FMPService>();
builder.Services.AddScoped<IAlarmRepository, AlarmRepository>();

// 1.8 集成 Azure Key Vault（可选）
// 目前不使用 Azure Key Vault，但保留集成代码以备将来使用。
// 确保在需要时取消注释并安装必要的 NuGet 包（Azure.Extensions.AspNetCore.Configuration.Secrets）。

/*
using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;

var keyVaultName = builder.Configuration["KeyVaultName"];
if (!string.IsNullOrEmpty(keyVaultName))
{
    var keyVaultUri = new Uri($"https://{keyVaultName}.vault.azure.net/");
    builder.Configuration.AddAzureKeyVault(keyVaultUri, new DefaultAzureCredential());
}
*/

var app = builder.Build();

// 2. 配置中间件

// 2.1 使用 CORS
app.UseCors("AllowFrontend");

// 2.2 开发环境使用 Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // 访问地址通常为 https://localhost:5177/swagger/index.html
}

// 2.3 启用 HTTPS 重定向
app.UseHttpsRedirection();

// 2.4 认证与授权
app.UseAuthentication();
app.UseAuthorization();

// 2.5 映射控制器
app.MapControllers();

// 3. 运行应用
app.Run();

// 定义强类型 JWT 配置类
public class JwtSettings
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string SigningKey { get; set; }
}


/*
顶层代码详细解释(Top Code Details Specification)：

    配置加载顺序：
        Minimal Hosting Model：在 .NET 8 中，WebApplication.CreateBuilder(args) 已经自动加载了 appsettings.json、appsettings.{Environment}.json 和环境变量。因此，无需手动配置 ConfigureAppConfiguration，除非有特定需求。
        环境特定的配置文件：确保项目根目录下有 appsettings.Development.json 和 appsettings.Production.json，这些文件将根据 ASPNETCORE_ENVIRONMENT 环境变量自动加载。

    服务配置：
        CORS：配置了一个名为 "AllowFrontend" 的策略，允许来自指定前端 URL 的跨域请求。
        Controllers：添加了控制器服务，并配置了 Newtonsoft.Json 以处理 JSON 序列化，特别是为了避免引用循环问题。
        Swagger：配置了 Swagger/OpenAPI，并集成了 JWT Bearer 认证，以便在 Swagger UI 中测试受保护的 API 端点。
        数据库上下文：配置了 ApplicationDBContext 使用 SQL Server，并从配置文件中获取连接字符串。
        Identity：配置了 ASP.NET Core Identity，并设置了密码策略。
        JWT 认证：配置了 JWT Bearer 认证，使用从配置文件中获取的 JWT 设置。
        依赖注入：注册了所有自定义的仓储和服务，以便通过依赖注入使用。

    中间件配置：
        CORS：应用了之前配置的 CORS 策略。
        Swagger：在开发环境中启用了 Swagger UI。
        HTTPS 重定向：强制使用 HTTPS。
        认证与授权：启用了认证和授权中间件。
        映射控制器：映射了控制器路由。

    Azure Key Vault 集成(配置较麻烦，Azure Cloud service可能会产生额外费用，备用)：
        暂不使用：当前集成 Azure Key Vault 的代码被注释掉，以便将来需要时可以轻松启用。
        保留集成代码：保留了集成 Azure Key Vault 的代码块，并添加了必要的 using 指令作为注释。
*/


/*
在 .NET 8 中，ASP.NET Core 继续沿用简化的 Minimal Hosting Model，与之前的版本（如 .NET 6 和 .NET 7）非常相似。因此，你的 Program.cs 大部分配置在 .NET 8 中仍然适用。不过，为了充分利用 .NET 8 的新特性和最佳实践，以下是对你现有配置的优化和调整建议。
主要优化点

    统一和简化 CORS 配置：避免重复配置，使用命名策略。
    使用强类型配置：将 JWT 配置映射到强类型类，提高可维护性。
    优化 Swagger 配置：确保在所有环境下的安全性和可用性。
    使用 System.Text.Json（可选）：除非有特定需求，否则推荐使用内置的 JSON 序列化器。
    提升代码可读性和组织结构。

更新后的 Program.cs 示例

以上是优化后的 Program.cs，适用于 .NET 8：
*/

/***************************************************************************************************************************/
/*以下为旧代码，因为太乱，全部注释掉， modifed by Jay @ 01.09.2024*/
// using api.Data;
// using api.Interfaces;
// using api.Models;
// using api.Repository;
// using api.Service;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;

// var builder = WebApplication.CreateBuilder(args);
// //builder.WebHost.UseUrls("http://localhost:5177");

// // 1. 配置服务

// // 1.1 配置 CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend", policy =>
//     {
//         policy.WithOrigins("https://witty-moss-0dca53900.5.azurestaticapps.net") // 替换为你的前端 Static Web Apps URL
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// // Add services to the container.
// builder.Services.AddControllers();
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddSwaggerGen(option =>
// {
//     option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
//     option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//     {
//         In = ParameterLocation.Header,
//         Description = "Please enter a valid token",
//         Name = "Authorization",
//         Type = SecuritySchemeType.Http,
//         BearerFormat = "JWT",
//         Scheme = "Bearer"
//     });
//     option.AddSecurityRequirement(new OpenApiSecurityRequirement
//     {
//         {
//             new OpenApiSecurityScheme
//             { 
//                 Reference = new OpenApiReference
//                 {
//                     Type=ReferenceType.SecurityScheme,
//                     Id="Bearer"
//                 }
//             },
//             new string[]{}
//         }
//     });
// });

// builder.Services.AddControllers().AddNewtonsoftJson(options =>
// {
//     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
// });

// /*register Entity Framework service related*/
// builder.Services.AddDbContext<ApplicationDBContext>(options =>
// {
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
// });

// /*register Identity service related*/
// builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
// {
//     options.Password.RequireDigit = true;
//     options.Password.RequireLowercase = true;
//     options.Password.RequireUppercase = true;
//     options.Password.RequireNonAlphanumeric = true;
//     options.Password.RequiredLength = 12;
// }).AddEntityFrameworkStores<ApplicationDBContext>();

// /*register JWT service*/
// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme =
//     options.DefaultChallengeScheme =
//     options.DefaultForbidScheme =
//     options.DefaultScheme =
//     options.DefaultSignInScheme =
//     options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(options =>
// {
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuer = true,
//         ValidIssuer = builder.Configuration["JWT:Issuer"],
//         ValidateAudience = true,
//         ValidAudience = builder.Configuration["JWT:Audience"],
//         ValidateIssuerSigningKey = true,
//         IssuerSigningKey = new SymmetricSecurityKey(
//             System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
//         )
//     };
// });

// /* belows are Dependency Injections to register*/
// builder.Services.AddScoped<IStockRepository, StockRepository>(); // Repository Pattern
// builder.Services.AddScoped<ICommentRepository, CommentRepository>();
// builder.Services.AddScoped<ITokenService, TokenService>();
// builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();
// builder.Services.AddScoped<IFMPService, FMPService>();
// builder.Services.AddHttpClient<IFMPService, FMPService>();
// builder.Services.AddScoped<IAlarmRepository, AlarmRepository>();

// var app = builder.Build();

// // 使用 CORS
// app.UseCors("AllowFrontend");

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(); //http://localhost:5177/swagger/index.html
// }

// app.UseHttpsRedirection();

// app.UseCors(x => x
//      .AllowAnyMethod()
//      .AllowAnyHeader()
//      .AllowCredentials()
//       //.WithOrigins("https://localhost:44351))
//       .SetIsOriginAllowed(origin => true));

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers(); //if you dont do this, swagger will not go to work.

// app.Run();

// /*builder.Services 用于注册应用程序的服务。例如，AddDbContext 用于注册数据库上下文，AddScoped 用于注册自定义服务接口的实现。*/
