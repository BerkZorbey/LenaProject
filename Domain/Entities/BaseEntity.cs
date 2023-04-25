using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class BaseEntity
    {
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
    }
}
