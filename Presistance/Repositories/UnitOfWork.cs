using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Presistance.EFCoreDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presistance.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LenaDbContext _db;
        public IBaseRepository<Form> FormRepository { get; private set; }

        public IBaseRepository<Field> FieldRepository { get; private set; }

        public IBaseRepository<User> UserRepository { get; private set; }

        public UnitOfWork(LenaDbContext db)
        {
            _db = db;
            FormRepository = new BaseRepository<Form>(_db);
            FieldRepository = new BaseRepository<Field>(_db);
            UserRepository = new BaseRepository<User>(_db);
        }

       

        public Task CompleteAsync()
        {
            using (var dbContextTransaction = _db.Database.BeginTransaction())
            {
                try
                {
                    _db.SaveChanges();
                    dbContextTransaction.Commit();
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                }
            }

            return Task.CompletedTask;
        }
    }
}
