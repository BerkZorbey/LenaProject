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
    public class FormRepository : BaseRepository<Form>, IFormRepository
    {
        private readonly LenaDbContext _dbContext;
        private readonly DbSet<Form> _forms;
        public FormRepository(LenaDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
            _forms = _dbContext.Set<Form>();
        }
        public async Task<ResponseModel<Form>> GetById(int id)
        {
            var entity = await _forms.Where(x => x.Id == id).FirstOrDefaultAsync();
            return new ResponseModel<Form>(entity);
        }

        public async Task<ResponseModel<List<Form>>> GetUserFormById(string userId)
        {
            var entity = await _forms.Where(x => x.UserId == userId).ToListAsync();
            return new ResponseModel<List<Form>>(entity);
        }
    }
}
