using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Presistance.EFCoreDbContext;
using Presistance.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presistance
{
    public static class PresistanceRegistrationService
    {
        public static IServiceCollection AddPresistanceServices(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<LenaDbContext>(opt =>
                opt.UseSqlServer(configuration.GetConnectionString("SQL"))
            );

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IBaseRepository<Form>, BaseRepository<Form>>();
            services.AddScoped<IBaseRepository<Field>, BaseRepository<Field>>();
            services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();

            services.AddScoped<IFieldRepository, FieldRepository>();
            services.AddScoped<IFormRepository, FormRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }

    }
}
