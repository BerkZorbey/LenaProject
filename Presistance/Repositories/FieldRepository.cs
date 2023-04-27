using Application.Interfaces.Repositories;
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
    public class FieldRepository : BaseRepository<Field>, IFieldRepository
    {
        private readonly LenaDbContext _dbContext;
        private readonly DbSet<Field> _field;
        public FieldRepository(LenaDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
            _field = _dbContext.Set<Field>();
        }

        public async Task<ResponseModel> AddFields(Field Fields)
        {
            await _field.AddAsync(Fields);

            return new ResponseModel(201, "Successfully Fields Added.");
        }

        public async Task<ResponseModel<Field>> GetById(int id,int FormId)
        {
            var entity = await _field.Where(x => x.Id == id && x.FormId == FormId).FirstOrDefaultAsync();
            return new ResponseModel<Field>(entity);
        }
    }
}
