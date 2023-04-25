using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Enums.BaseEnum;

namespace Domain.Entities
{
    public class Field : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool Required { get; set; }
        public string Name { get; set; }
        public DataTypes DataType { get; set; }
        public int FormId { get; set; }
    }
}
