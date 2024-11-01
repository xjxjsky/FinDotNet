#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AlarmSimulatorService/AlarmSimulatorService.csproj", "AlarmSimulatorService/"]
RUN dotnet restore "AlarmSimulatorService/AlarmSimulatorService.csproj"
COPY . .
WORKDIR "/src/AlarmSimulatorService"
RUN dotnet build "AlarmSimulatorService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AlarmSimulatorService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AlarmSimulatorService.dll"]