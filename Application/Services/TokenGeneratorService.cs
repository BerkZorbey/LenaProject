﻿using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TokenGeneratorService : ITokenGeneratorService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public TokenGeneratorService(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
        }
        public Token GenerateToken()
        {
            Token token = new();
            var expiration = DateTime.Now.AddHours(1);
            token.TokenExpiration = expiration;
            var signingCredentials = GetSecurityKey();
            var tokenOptions = GenerateTokenOptions(signingCredentials, expiration);
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            token.AccessToken = jwtSecurityTokenHandler.WriteToken(tokenOptions);
            token.RefreshToken = Guid.NewGuid().ToString();
            token.RefreshTokenExpiration = expiration.AddHours(1);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);
            return token;
        }
        private SigningCredentials GetSecurityKey()
        {
            var key = Encoding.UTF8.GetBytes(_configuration["JwtToken:Key"]);
            var securityKey = new SymmetricSecurityKey(key);
            return new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        }
        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, DateTime expiration)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["JwtToken:Issuer"],
                audience: _configuration["JwtToken:Audience"],
                notBefore: DateTime.Now,
                expires: expiration,
                signingCredentials: signingCredentials
            );
            return tokenOptions;
        }
    }
}
