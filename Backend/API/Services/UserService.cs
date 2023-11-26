using API.DbModels;
using API.DTOs;
using API.Services.Contract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext dbcontext;
        public UserService(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<ActionResult<DbUser>> Login(LoginDTO userDetails, string userId)
        {
            var user = await dbcontext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                user = new DbUser
                {
                    Id = userId,
                    Name = userDetails.Name,
                    Email = userDetails.Email,
                };
                await dbcontext.Users.AddAsync(user);
                await dbcontext.SaveChangesAsync();
            }
            return user;
        }
    }
}
