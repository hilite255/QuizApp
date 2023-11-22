using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext dbcontext;
        public UserController(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
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
            var user = await dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                user = new DbUser
                {
                    Id = id,
                    Name = userDetails.Name,
                    Email = userDetails.Email,
                };
                await dbcontext.Users.AddAsync(user);
            }
            return user;
        }
    }
}
