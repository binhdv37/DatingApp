using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }

        //neu username or password k thoa man cac dieu kien tren
        // => response 1 object co dang :
        // { "username" : "the username field is required",
        //   "password" : "the password field is required" }
    }
}
