using API.DbModels;
using API.DTOs;
using API.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("login")]
        [Authorize]
        public async Task<ActionResult<DbUser>> Login([FromBody] LoginDTO userDetails)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (idClaim == null)
            {
                throw new ArgumentNullException("Id", "Nincs Id a tokenben");
            }
            var id = idClaim.Value;
            return await userService.Login(userDetails, id);
        }
    }
}
