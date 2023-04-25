using Application.DTOs;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LenaProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : BaseController
    {
        private readonly IFormService _formService;
        public FormController(IFormService formService)
        {
            _formService = formService;
        }
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetUserFormsAsync(string UserId)
        {
            var forms = await _formService.GetUserFormsAsync(UserId);
            if(forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpGet("form/{FormId}")]
        public async Task<IActionResult> GetFormById(int FormId)
        {
            var forms = await _formService.GetFormById(FormId);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateUserForm([FromBody]CreateFormDTO form)
        {
            var forms = await _formService.CreateUserForm(form);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpPost("{FormId}")]
        public async Task<IActionResult> AddFieldsToForm(int FormId,[FromBody] List<FieldDTO> Fields)
        {
            var forms = await _formService.AddFieldsToForm(FormId, Fields);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpPut("{FormId}")]
        public async Task<IActionResult> ChangeFormProperties(int FormId,[FromBody] FormDTO formDTO)
        {
            var forms = await _formService.ChangeFormProperties(FormId, formDTO);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpDelete("{FormId}")]
        public async Task<IActionResult> DeleteForm(int FormId)
        {
            var forms = await _formService.DeleteForm(FormId);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
        [HttpDelete("Form/{FieldId}")]
        public async Task<IActionResult> DeleteFieldFromForm(int FieldId)
        {
            var forms = await _formService.DeleteFieldFromForm(FieldId);
            if (forms.Success == true)
            {
                return Ok(forms);
            }
            else
            {
                return BadRequest(forms);
            }
        }
    }
}
