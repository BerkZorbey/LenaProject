using Application.Interfaces.Repositories;
using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
        public IBaseRepository<Form> FormRepository { get; }
        public IBaseRepository<Field> FieldRepository { get; }
        public IBaseRepository<User> UserRepository { get; }
    }
}
