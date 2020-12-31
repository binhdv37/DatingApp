using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }

        // cac truong id, name, ... dc ke thua tu IdentityRole nen k can khai bao

    }
}
