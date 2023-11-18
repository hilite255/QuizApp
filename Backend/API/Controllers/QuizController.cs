using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            
            var quiz = new DbQuiz()
            {
                Creator = dbcontext.Users.First(u => u.Id == userId),
                Title = newQuiz.Title,
                Duration = newQuiz.Duration,
                StartTime = newQuiz.StartTime,
                EndTime = newQuiz.EndTime,
            };

            var questions = new List<DbQuestion>();
            foreach (var question in newQuiz.Questions)
            {
                questions.Add(new DbQuestion()
                {
                    Text = question.Text,
                    Type = question.Type,
                    Answer = question.Answer,
                    Score = question.Score,
                    Options = question.Options,
                    Quiz = quiz,
                });
            }
            quiz.Questions = questions;
            await dbcontext.SaveChangesAsync();

            return quiz;
        }
    }
}
