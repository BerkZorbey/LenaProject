using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserLoginDTO>();
            CreateMap<UserLoginDTO, User>();
            CreateMap<User, UserRegisterDTO>();
            CreateMap<UserRegisterDTO, User>();
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<FormDTO, Form>();
            CreateMap<Form, FormDTO>();
            CreateMap<CreateFormDTO, Form>();
            CreateMap<Form, CreateFormDTO>();

            CreateMap<FieldDTO, Field>();
            CreateMap<Field, FieldDTO>();
        }
    }
}
