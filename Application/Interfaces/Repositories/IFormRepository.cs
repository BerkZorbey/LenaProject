using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IFormRepository : IBaseRepository<Form>
    {
        public Task<ResponseModel<Form>> GetById(int id);
        public Task<ResponseModel<List<Form>>> GetUserFormById(string userId);
    }
}
