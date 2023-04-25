using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories.Base
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        public Task<ResponseModel<IEnumerable<TEntity>>> GetAll();
        public Task<ResponseModel<TEntity>> InsertAsync(TEntity entity);
        public Task<ResponseModel> UpdateAsync(TEntity entity);
        public Task<ResponseModel> PatchAsync(TEntity entity);
        public Task<ResponseModel> HardDeleteAsync(TEntity entity);

    }
}
