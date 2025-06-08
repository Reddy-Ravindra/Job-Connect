using JobConnect.Data;
using Microsoft.EntityFrameworkCore;
using JobConnect.Services.Auth;
using JobConnect.Core.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// 👇 Connection string from config
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
    
builder.Services.AddScoped<IAuthService, AuthService>();