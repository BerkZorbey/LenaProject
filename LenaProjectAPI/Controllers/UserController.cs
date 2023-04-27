using Application.DTOs;
using Application.Interfaces.Services;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LenaProjectAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<ResponseModel<User>> Register([FromBody] UserRegisterDTO user)
        {
            var newUser = await _userService.Register(user);
            return newUser;
        }
        [HttpPost]
        [Route("login")]
        public async Task<ResponseModel<UserDTO>> Login([FromBody] UserLoginDTO loginUser)
        {
            var user = await _userService.Login(loginUser);
            return user;
        }
    }
}
