using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class AppUser : IdentityUser
    {
        public string DispalyName { get; set; }
        public string Bio { get; set; }
    }
}