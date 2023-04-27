using Application.DTOs;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ITokenGeneratorService _tokenGeneratorService;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IMapper mapper, IUserRepository userRepository, ITokenGeneratorService tokenGeneratorService, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _tokenGeneratorService = tokenGeneratorService;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<User>> GetUserAsync(string id)
        {
            try
            {
                var user = await _userRepository.GetUserById(id);
                if (user.Model is null) throw new Exception("User not found!");
                return new ResponseModel<User>(user.Model);
            }
            catch(Exception ex) 
            { 
                return new ResponseModel<User>(404,ex.Message);
            } 
            
        }

        public async Task<ResponseModel<UserDTO>> Login(UserLoginDTO LoginUser)
        {
            try
            {
                var user = _mapper.Map<User>(LoginUser);
                var getUser = await _userRepository.Login(user);
                if (getUser.Model is null) throw new Exception("User not found!");
                if (!DecryptPassword(LoginUser.Password, getUser.Model.PasswordHash, getUser.Model.PasswordSalt)) throw new Exception("Password not correct!");
                getUser.Model.Token = _tokenGeneratorService.GenerateToken();
                var loginUser = _mapper.Map<UserDTO>(getUser.Model);
                return new ResponseModel<UserDTO>(loginUser);
            }
            catch (Exception ex)
            {
                return new ResponseModel<UserDTO>(401,ex.Message);
            }
        }

        public async Task<ResponseModel<User>> Register(UserRegisterDTO RegisterUser)
        {
            try
            {
                byte[] passwordHash, passwordSalt;
                var newUser = _mapper.Map<User>(RegisterUser);
                EncryptPassword(RegisterUser.Password, out passwordHash, out passwordSalt);
                var isThereSameEmail = await _userRepository.GetUserByEmail(newUser.Email);
                if (isThereSameEmail.Model != null) throw new Exception("There is already registered user with this email");
                newUser.PasswordSalt = passwordSalt;
                newUser.PasswordHash = passwordHash;

                var result = await _userRepository.InsertAsync(newUser);
                await _unitOfWork.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                return new ResponseModel<User>(401,ex.Message);
            }
        }

        private void EncryptPassword(string Password,out byte[] passwordHash,out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
        }
        private bool DecryptPassword(string Password,  byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }
    }
}
