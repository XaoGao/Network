using System.ComponentModel.DataAnnotations;

namespace Network_API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "You mast specify password between 4 and 10 characters")]
        public string password { get; set; }
    }
}