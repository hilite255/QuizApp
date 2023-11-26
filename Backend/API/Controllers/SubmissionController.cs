using API.DbModels;
using API.DTOs;
using API.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/submission")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly ISubmissionService submissionService;
        public SubmissionController(ISubmissionService submissionService)
        {
            this.submissionService = submissionService;
        }

        [HttpPost("submit/{quizId}")]
        [Authorize]
        public async Task<ActionResult<DbSubmission>> Submit(int quizId, [FromBody] SubmissionDTO newSubmission)
        {
            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            try
            {
                return await submissionService.Submit(quizId, newSubmission, userId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{quizId}")]
        public async Task<ActionResult<List<DbSubmission>>> ListSubmissionsForQuiz(int quizId)
        {
            return await submissionService.ListSubmissionsForQuiz(quizId);
        }
    }
}
