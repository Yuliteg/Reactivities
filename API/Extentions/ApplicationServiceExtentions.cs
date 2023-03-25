using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace API.Extentions
{
  public static class ApplicationServiceExtentions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
     IConfiguration config)
    {
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DafaultConnection"));
      });
      services.AddCors(opt =>
        {
          opt.AddPolicy("CorsPolicy", policy =>
          {
            policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
          });
        });

      services.AddMediatR(typeof(List.Handler));
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);
      services.AddFluentValidationAutoValidation();
      services.AddValidatorsFromAssemblyContaining<Create>();
       

      return services;
    }
  }
}