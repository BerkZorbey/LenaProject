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
    public class FormService : IFormService
    {
        private readonly IFormRepository _formRepository;
        private readonly IFieldRepository _fieldRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public FormService(IFormRepository formRepository, IFieldRepository fieldRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _formRepository = formRepository;
            _fieldRepository = fieldRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel> AddFieldsToForm(int FormId, List<FieldDTO> Fields)
        {
            try
            {
                var mapper = _mapper.Map<List<Field>>(Fields);
                foreach (var field in mapper) { field.FormId = FormId; }
                var result = await _fieldRepository.AddFields(mapper);
                await _unitOfWork.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                return new ResponseModel(401, ex.Message);
            }
        }

        public async Task<ResponseModel> ChangeFormProperties(int FormId, FormDTO formDTO)
        {
            try
            {
                var form = await _formRepository.GetById(FormId);
                if(form.Model is null) throw new Exception("Form not found!");
                form.Model.Description = formDTO.Description != default ? formDTO.Description : form.Model.Description;
                form.Model.Name = formDTO.Name != default ? formDTO.Name : form.Model.Name;
                var result = await _formRepository.UpdateAsync(form.Model);
                await _unitOfWork.CompleteAsync();
                return new ResponseModel(200, "Succesfull changed.");
            }
            catch (Exception ex)
            {
                return new ResponseModel(401, ex.Message);
            }
        }

        public async Task<ResponseModel<Form>> CreateUserForm(CreateFormDTO form)
        {
            try
            {
                var newForm = _mapper.Map<Form>(form);
                var result = await _formRepository.InsertAsync(newForm);
                await _unitOfWork.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                return new ResponseModel<Form>(401, ex.Message);
            }
        }

        public async Task<ResponseModel> DeleteFieldFromForm(int FieldId)
        {
            try
            {
                var field = await _fieldRepository.GetById(FieldId);
                if (field.Model is null) throw new Exception("Form Field not found!");
                var result = await _fieldRepository.HardDeleteAsync(field.Model);
                await _unitOfWork.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                return new ResponseModel(404, ex.Message);
            }
        }

        public async Task<ResponseModel> DeleteForm(int FormId)
        {
            try
            {
                var form = await _formRepository.GetById(FormId);
                if (form.Model is null) throw new Exception("Form not found!");
                var result = await _formRepository.HardDeleteAsync(form.Model);
                await _unitOfWork.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                return new ResponseModel(404, ex.Message);
            }
        }

        public async Task<ResponseModel<Form>> GetFormById(int FormId)
        {
            try
            {
                var form = await _formRepository.GetById(FormId);
                if (form.Model is null) throw new Exception("Form not found!");
                return new ResponseModel<Form>(form.Model);
            }
            catch (Exception ex)
            {
                return new ResponseModel<Form>(404, ex.Message);
            }
        }

        public async Task<ResponseModel<List<Form>>> GetUserFormsAsync(string UserId)
        {
            try
            {
                var form = await _formRepository.GetUserFormById(UserId);
                if (form.Model is null) throw new Exception("Form not found!");
                return new ResponseModel<List<Form>>(form.Model);
            }
            catch(Exception ex) 
            { 
                return new ResponseModel<List<Form>>(404,ex.Message);
            } 
        }
    }
}
