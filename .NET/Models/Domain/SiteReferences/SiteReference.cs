using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class SiteReference : ReferenceType
    {
        public int ReferenceTypeId { get; set; }
        public int UserId { get; set; }
    }
}
