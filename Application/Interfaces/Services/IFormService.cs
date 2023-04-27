using Application.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IFormService
    {
        public Task<ResponseModel<List<Form>>> GetUserFormsAsync(string UserId);
        public Task<ResponseModel<Form>> GetFormById(int  FormId);
        public Task<ResponseModel<Form>> CreateUserForm(CreateFormDTO form);
        public Task<ResponseModel> AddFieldsToForm(int FormId,FieldDTO Fields);
        public Task<ResponseModel> DeleteFieldFromForm(int FieldId,int FormId);
        public Task<ResponseModel> DeleteForm(int FormId);
        public Task<ResponseModel> ChangeFormProperties(int FormId, FormDTO formDTO);

    }
}
