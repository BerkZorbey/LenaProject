using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class CreateFormDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public List<FieldDTO> Fields { get; set; }
    }
}
