using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.Contract
{
    public interface IUserService
    {
        Task<ActionResult<DbUser>> Login(LoginDTO userDetails, string userId);
    }
}
