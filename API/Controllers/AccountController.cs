using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context) : BaseApiController
{
    private readonly TokenService _tokenService = tokenService;
    private readonly UserManager<User> _userManager = userManager;
    private readonly StoreContext _context = context;

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

        var userBaket = await RetrieveBasket(loginDto.Username);
        var anonBasket  =await RetrieveBasket(Request.Cookies["buyerId"]!);

        if (anonBasket != null)
        {
            if (userBaket != null) _context.Baskets.Remove(userBaket);
            anonBasket.BuyerId = user.UserName!;
            Response.Cookies.Delete("buyerId");
            await _context.SaveChangesAsync();
        }
        return new UserDto
        {
            Email = user.Email!,
            Token = await _tokenService.GenerateTokenAsync(user),
            Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBaket!.MapBasketToDto(),

        };
    }

    private async Task<Basket?> RetrieveBasket(string buyerId)
    {
        if (string.IsNullOrEmpty(buyerId))
        {
            Response.Cookies.Delete("buyerId");
            return null;
        }

        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity!.Name!);

        var userBaket = await RetrieveBasket(User.Identity!.Name!);

        return new UserDto
        {
            Email = user!.Email!,
            Token = await _tokenService.GenerateTokenAsync(user),
            Basket = userBaket!.MapBasketToDto(),
        };
    }
}

