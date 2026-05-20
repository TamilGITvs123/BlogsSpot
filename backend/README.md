# BlogApi (ASP.NET Core)

This is a minimal ASP.NET Core Web API for the BlogsSpot demo. It uses PostgreSQL via EF Core and issues JWTs for authentication.

Quick start

1. Install .NET 8 SDK.
2. Update the connection string in `appsettings.json` (`ConnectionStrings:DefaultConnection`).
3. Replace `Jwt:Key` in `appsettings.json` with a secure secret.
4. From this `backend/` folder run:

```
dotnet restore
dotnet run
```

The API will start on the default port. Endpoints:

- `POST /api/auth/register` { username, password }
- `POST /api/auth/login` { username, password } => { token }
- `GET /api/blogs` (public)
- `GET /api/blogs/{id}` (public)
- `POST /api/blogs` (require Authorization: Bearer <token>)
- `PUT /api/blogs/{id}` (require owner Authorization)

Notes
- This demo uses `Database.EnsureCreated()` for simplicity. For production use migrations.
- Passwords are hashed with BCrypt.
