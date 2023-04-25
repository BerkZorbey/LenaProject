using Application.DTOs;
using Application.Interfaces.Services;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LenaProjectAPI.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO user)
        {
            var newUser = await _userService.Register(user);
            if(newUser.Success == true)
            {
                return Ok(newUser);
            }
            else
            {
                return BadRequest(newUser);
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO loginUser)
        {
            var user = await _userService.Login(loginUser);
            if (user.Success == true)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest(user);
            }
        }
    }
}
