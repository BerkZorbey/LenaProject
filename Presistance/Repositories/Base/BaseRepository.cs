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
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly LenaDbContext _dbContext;
        private readonly DbSet<TEntity> _entities;
        public BaseRepository(LenaDbContext dbContext)
        {
            this._dbContext = dbContext;
            this._entities = _dbContext.Set<TEntity>();
        }

        public async Task<ResponseModel<IEnumerable<TEntity>>> GetAll()
        {
            var entity = await _entities.AsNoTracking().ToListAsync();
            return new ResponseModel<IEnumerable<TEntity>>(entity);
        }
        public async Task<ResponseModel<TEntity>> InsertAsync(TEntity entity)
        {
            await _entities.AddAsync(entity);
            return new ResponseModel<TEntity>(201, $"Successfully {typeof(TEntity).Name} Added.", entity);
        }
        public Task<ResponseModel> UpdateAsync(TEntity entity)
        {
            _entities.Update(entity);
            return Task.FromResult(new ResponseModel(200, $"Successfully {typeof(TEntity).Name} Updated."));
        }
        public Task<ResponseModel> PatchAsync(TEntity entity)
        {
            _entities.Update(entity);
            return Task.FromResult(new ResponseModel(200, $"Successfully {typeof(TEntity).Name} Updated."));
        }
        public Task<ResponseModel> HardDeleteAsync(TEntity entity)
        {
            _entities.Remove(entity);
            return Task.FromResult(new ResponseModel(200, $"Successfully {typeof(TEntity).Name} Removed."));
        }
    }
}
