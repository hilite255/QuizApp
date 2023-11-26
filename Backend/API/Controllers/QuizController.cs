using API.DbModels;
using API.DTOs;
using API.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService quizService;

        public QuizController(IQuizService quizService)
        {
            this.quizService = quizService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuizWithQuestions>> GetQuiz(int id)
        {
            try
            {
                return await quizService.GetQuiz(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<NoContentResult> Delete(int id)
        {
            return await quizService.Delete(id);
        }

        [HttpGet("all")]
        public async Task<ActionResult<QuizListDTO>> ListQuizzes(int page, int perpage)
        {
            return await quizService.ListQuizzes(page, perpage);
        }

        [Authorize]
        [HttpGet("all/user")]
        public async Task<ActionResult<QuizListDTO>> GetQuizzesForUser(int page, int perpage)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new ArgumentNullException("Id", "Nincs Id a tokenben");
            }
            var userId = userIdClaim.Value;
            return await quizService.GetQuizzesForUser(page, perpage, userId);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<DbQuiz>> CreateQuiz([FromBody] CreateQuizDTO newQuiz)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new ArgumentNullException("Id", "Nincs Id a tokenben");
            }
            var userId = userIdClaim.Value;

            try
            {
                return await quizService.CreateQuiz(newQuiz, userId);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [HttpGet("{quizId}/stats")]
        public async Task<ActionResult<StatsDTO>> GetStats(int quizId)
        {
            return await quizService.GetStats(quizId);
        }
    }
}
