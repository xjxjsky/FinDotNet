1. open VSCODE cmd terminal, type in "dotnet new webapi -o api" (-o standing for outputting to current folder) 
2. dotnet watch run : cd到 api folder, type "dotnet watch run" into the cmd terminal
3. extensions you should intall them(在一个类中type "ctor" ，"prop" 可以快速生成构造器和成员属性,如果安装相关C#插件后).
C#,C# Dev Kit（IntelliCode for C# Dev Kit）, .NET Install Tool, Nuget Gallery, Prettier,(C#) Extension Pack By JosKreativ, 
4. EntityFramework
type "dotnet ef migrations add init" within the FinDotNet Folder command
"dotnet build" 是一个 .NET CLI 命令，用于编译 .NET 项目。它会生成项目的可执行文件、库文件、以及其他相关的输出文件
dotnet ef migrations add init
dotnet ef database update
5. "dotnet watch run" 是一个用于 ASP.NET Core 和 .NET Core 应用程序的命令。它结合了 dotnet run 命令与文件监视器功能，允许开发者在文件更改时自动重新编译和运行应用程序。这在开发过程中非常有用，因为它能够即时反映代码的修改，而无需手动停止和重新启动应用程序。
6. ctrl+shift+L 快捷键可以选择多处相同的代码，一并删除或者修改。
7. Type "identity.Core" to install Identity from MS within NuGet Gallery, to keep matching with the <TargetFramework>net8.0</TargetFramework> file in api.csproj
8. 在program.cs中注册Identity 和 JWT，以及 app.UseAuthentication() & app.UseAuthorization();
9. 运行 dotnet ef migrations add Identity 和 dotnet ef database update， 数据库表随即更新，增加了“AspNetUsers”，“AspNetUserTokens”等等这些表。
10. dotnet clean; dotnet restore; dotnet build; dotnet list package --include-transitive(检查包依赖关系)
11. type "dotnet ef migrations add SeedRole" & "dotnet ef database update" into cmd prompt
12. JWT Token decode: https://jwt.io/
13. 24.Login 最后的test验证搞不清楚
14. 25.Many-To-Many : "dotnet ef migrations add PortfolioManyToMany" and "dotnet ef database update"
15. 29. One-TO-One: "dotnet ef migrations add CommentOneToOne" and "dotnet ef database update"
16. 31. Data Seeding, Convert Json to C# Classes Online.
17. 33.Services React TypeScript Context Auth JWT, 需要在frontend目录下运行"npm install react-toastify"
18. React TypeScript Context Auth JWT-34.Context: what's the difference between a custom hook and Context?  阐述了useAuth.tsx文件（custom hook）的由来。
19. React TypeScript Context Auth JWT-35.Login(with React Hook Froms and Yup): type "npm install react-hook-form yup @hookform/resolvers" and "npm start", type "tsrafce" in ts file to create ts code.
20. What you should know: WPF & WCF have already been deprecated by MS...
    WPF（Windows Presentation Foundation）和 WCF（Windows Communication Foundation）曾经是 .NET Framework 中的两个重要组成部分，但它们在 .NET Core 中的命运各不相同：
    WPF：在 .NET Core 3.0 及以上版本中已经得到了支持，主要在 Windows 平台上运行。你可以继续使用 WPF 来构建现代桌面应用。
    WCF：不像 WPF，WCF 并没有被完全移植到 .NET Core 中。微软推荐使用 gRPC 或 ASP.NET Core Web API 作为替代方案来开发服务。如果你依赖 WCF 功能，你可能需要寻找一些替代方案或者继续在 .NET Framework 上开发。
21. 