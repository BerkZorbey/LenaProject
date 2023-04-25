using Application.Interfaces;
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
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly LenaDbContext _dbContext;
        private readonly DbSet<User> _users;
        public UserRepository(LenaDbContext dbContext,IUnitOfWork unitOfWork) : base(dbContext)
        {
            _dbContext = dbContext;
            _users = _dbContext.Set<User>();
        }

        public async Task<ResponseModel<User>> Login(User user)
        {
            var entity = await _users.Where(x => x.Email == user.Email).FirstOrDefaultAsync();
            return new ResponseModel<User>(entity);
        }
        public async Task<ResponseModel<User>> GetUserById(string id)
        {
            var entity = await _users.Where(x => x.Id == id).FirstOrDefaultAsync();
            return new ResponseModel<User>(entity);
        }
    }
}
