#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AlarmMonitorService/AlarmMonitorService.csproj", "AlarmMonitorService/"]
RUN dotnet restore "AlarmMonitorService/AlarmMonitorService.csproj"
COPY . .
WORKDIR "/src/AlarmMonitorService"
RUN dotnet build "AlarmMonitorService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AlarmMonitorService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AlarmMonitorService.dll"]