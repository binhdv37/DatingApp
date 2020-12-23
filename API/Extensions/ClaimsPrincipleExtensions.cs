using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            // lay truong NameId trong token ra, NameId chinh la UserName, theo nhu trong cau hinh token
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
