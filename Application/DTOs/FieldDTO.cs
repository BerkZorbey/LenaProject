using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.BaseEnum;

namespace Application.DTOs
{
    public class FieldDTO
    {
        public string Required { get; set; }
        public string Name { get; set; }
        public string DataType { get; set; }
    }
}
