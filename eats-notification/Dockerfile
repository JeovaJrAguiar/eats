FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["eats-notification.csproj", "."]
RUN dotnet restore "./eats-notification.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./eats-notification.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./eats-notification.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000
EXPOSE 7256
EXPOSE 5246
ENTRYPOINT ["dotnet", "eats-notification.dll"]