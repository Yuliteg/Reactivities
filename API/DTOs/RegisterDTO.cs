using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class RegisterDTO
  {
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,8}$$", ErrorMessage = "Password must be complex")]
    public string Password { get; set; }

    [Required]
    public string DisplayName { get; set; }

    [Required]
    public string Username { get; set; }
  }
}