﻿using API.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("login")]
        [Authorize]
        public ActionResult<DbUser> Login()
        {
            var id = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = dbcontext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                user = new DbUser
                {
                    Id = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                    Name = User.Claims.First(c => c.Type == "name").Value,
                    Email = User.Claims.First(c => c.Type == ClaimTypes.Email).Value,
                };
                dbcontext.Users.Add(user);
            }
            return user;
        }
    }
}
