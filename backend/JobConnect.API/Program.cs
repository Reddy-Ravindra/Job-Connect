using JobConnect.Data;
using Microsoft.EntityFrameworkCore;
using JobConnect.Services.Auth;
using JobConnect.Core.Interfaces;
using JobConnect.Services.Jobs;

var builder = WebApplication.CreateBuilder(args);

// 👇 Connection string from config
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJobService, JobService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

Console.WriteLine("🚀 API is running... Visit http://localhost:5197/swagger");

app.Run(); // 👈 This line was missing
