using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDTO loginDto)
    {
      var user = await _userManager.FindByEmailAsync(loginDto.Email);

      if (user == null) return Unauthorized();

      var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

      if (result)
      {
        return CreateUserObject(user);
      }
      return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
    {
      if (await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == registerDTO.Username.ToLower()))
      {
        ModelState.AddModelError("userName", "username taken");
        return ValidationProblem();
      }

      if (await _userManager.Users.AnyAsync(x => x.Email.ToLower() == registerDTO.Email.ToLower()))
      {
        ModelState.AddModelError("email", "email taken");
        return ValidationProblem();
      }

      var user = new AppUser
      {
        DisplayName = registerDTO.DisplayName,
        Email = registerDTO.Email,
        UserName = registerDTO.Username
      };

      var result = await _userManager.CreateAsync(user, registerDTO.Password);

      if (result.Succeeded)
      {
        return CreateUserObject(user);
      }

      return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
      return CreateUserObject(user);

    }

    private UserDto CreateUserObject(AppUser user)
    {
      return new UserDto
      {
        DisplayName = user.DisplayName,
        Image = null,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      };
    }
  }
}