using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api")]
    public class QuizController : ControllerBase
    {
        private readonly DatabaseContext dbcontext;
        public QuizController(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet("quiz/{id}")]
        public async Task<ActionResult<DbQuiz>> GetQuiz(int id)
        {
            var quiz = await dbcontext.Quizzes.FirstOrDefaultAsync(q => q.Id == id);
            if (quiz == null)
            {
                return BadRequest("Quiz doesn't exist with this id: " + id);
            }
            else
            {
                return quiz;
            }
        }

        [HttpGet("quiz/all")]
        public async Task<ActionResult<List<DbQuiz>>> ListQuizzes()
        {
            return await dbcontext.Quizzes.ToListAsync();
        }

        [Authorize]
        [HttpPost("quiz")]
        public async Task<ActionResult<DbQuiz>> CreateQuiz([FromBody] CreateQuizDTO newQuiz)
        {
            throw new NotImplementedException();
        }
    }
}
