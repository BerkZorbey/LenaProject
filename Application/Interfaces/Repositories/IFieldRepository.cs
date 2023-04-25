using Application.Interfaces.Repositories.Base;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IFieldRepository : IBaseRepository<Field>
    {
        public Task<ResponseModel<Field>> GetById(int id);
        public Task<ResponseModel> AddFields(List<Field> Fields);
    }
}
