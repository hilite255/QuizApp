using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly DatabaseContext dbcontext;
        public QuizController(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet("{id}")]
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

        [HttpGet("all")]
        public async Task<ActionResult<List<DbQuiz>>> ListQuizzes()
        {
            return await dbcontext.Quizzes.ToListAsync();
        }

        [Authorize]
        [HttpPost("create")]
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

        //[Authorize]
        [HttpGet("{quizId}/stats")]
        public async Task<ActionResult<StatsDTO>> GetStats(int quizId)
        {
            var quizStats = new StatsDTO();
            var quiz = await dbcontext.Quizzes.Include(q => q.Questions).Include(q => q.Creator).FirstAsync(q => q.Id == quizId);
            quizStats.QuizId = quizId;
            quizStats.QuizTitle = quiz.Title;
            quizStats.Questions = new List<QuestionStatDTO>();
            foreach (var question in quiz.Questions)
            {
                var questionStats = new QuestionStatDTO();
                questionStats.QuestionId = question.Id;
                questionStats.Text = question.Text;
                questionStats.QuestionType = question.Type.ToString();
                var answers = await dbcontext.Answers.Where(a => a.Question.Id == question.Id).ToListAsync();
                int correct = 0;
                int wrong = 0;
                foreach (var answer in answers)
                {
                    if (answer.IsCorrect)
                    {
                        correct++;
                    }
                    else
                    {
                        wrong++;
                    }
                }
                questionStats.Correct = correct;
                questionStats.Wrong = wrong;
                if (question.Type == QuestionType.TrueFalse)
                {
                    questionStats.Answers = new Dictionary<int, int>();
                    int trueAnswer = 0;
                    int falseAnswer = 0;
                    foreach (var answer in answers)
                    {
                        if(answer.Answer.ToLower() == "true")
                        {
                            trueAnswer++;
                        }
                        else
                        {
                            falseAnswer++;
                        }
                    }
                    questionStats.Answers.Add(0, trueAnswer);
                    questionStats.Answers.Add(1, falseAnswer);
                    questionStats.Options = question.Options;
                }
                if (question.Type == QuestionType.MultipleChoice)
                {
                    questionStats.Options = question.Options;
                    questionStats.Answers = new Dictionary<int, int>();
                    for (int i = 0; i < question.Options.Length; i++)
                    {
                        questionStats.Answers.Add(i, 0);
                    }
                    foreach(var answer in answers)
                    {
                        for (int i = 0; i < question.Options.Length; i++)
                        {
                            if (answer.Answer.ToLower().Contains((char)('a' + i)))
                            {
                                questionStats.Answers[i] += 1;
                            }
                        }
                    }
                }
                quizStats.Questions.Add(questionStats);
            }

            return quizStats;
        }
    }
}
