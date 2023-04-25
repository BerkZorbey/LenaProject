using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<ResponseModel<User>> Login(User user);
        public Task<ResponseModel<User>> GetUserById(string id);
    }
}
