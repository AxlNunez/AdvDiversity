using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class RoleAnalytics : Roles
    {
        public int Quantity { get; set; }

        public List<DateGrowth> UsersGrowth { get; set; }

    }
}