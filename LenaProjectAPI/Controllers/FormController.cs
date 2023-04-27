using Application.DTOs;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace LenaProjectAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class FormController : BaseController
    {
        private readonly IFormService _formService;
        public FormController(IFormService formService)
        {
            _formService = formService;
        }
        [HttpGet("forms/{UserId}")]
        public async Task<IActionResult> GetUserFormsAsync(string UserId)
        {
            var forms = await _formService.GetUserFormsAsync(UserId);
           if(forms.Model != null)
            return Ok(forms.Model);

            return BadRequest();
        }
        [HttpGet("form/{FormId}")]
        public async Task<ResponseModel<Form>> GetFormById(int FormId)
        {
            var forms = await _formService.GetFormById(FormId);
            return forms;
        }
        [HttpPost("create")]
        public async Task<ResponseModel<Form>> CreateUserForm([FromBody]CreateFormDTO form)
        {
            var forms = await _formService.CreateUserForm(form);
            return forms;
        }
        [HttpPost("form/addField/{FormId}")]
        public async Task<ResponseModel> AddFieldsToForm(int FormId,[FromBody] FieldDTO Field)
            {
            var forms = await _formService.AddFieldsToForm(FormId, Field);
            return forms;
        }
        [HttpPut("form/{FormId}")]
        public async Task<ResponseModel> ChangeFormProperties(int FormId,[FromBody] FormDTO formDTO)
        {
            var forms = await _formService.ChangeFormProperties(FormId, formDTO);
            return forms;
        }
        [HttpDelete("Form/{FormId}")]
        public async Task<ResponseModel> DeleteForm(int FormId)
        {
            var forms = await _formService.DeleteForm(FormId);
            return forms;
        }
        [HttpDelete("{FormId}/{FieldId}")]
        public async Task<ResponseModel> DeleteFieldFromForm(int FieldId,int FormId)
        {
            var forms = await _formService.DeleteFieldFromForm(FieldId,FormId);
            return forms;
        }
    }
}
