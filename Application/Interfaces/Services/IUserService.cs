using Application.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IUserService
    {
        public Task<ResponseModel<User>> GetUserAsync(string id);
        public Task<ResponseModel<User>> Login(UserLoginDTO user);
        public Task<ResponseModel<User>> Register(UserRegisterDTO user);
    }
}
