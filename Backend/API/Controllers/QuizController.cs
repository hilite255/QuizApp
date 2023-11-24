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
        public async Task<ActionResult<QuizWithQuestions>> GetQuiz(int id)
        {
            var quiz = await dbcontext.Quizzes.Include(q => q.Creator).FirstOrDefaultAsync(q => q.Id == id);
            if (quiz == null)
            {
                return BadRequest("Quiz doesn't exist with this id: " + id);
            }
            else
            {
                var questions = await dbcontext.Questions.Where(q => q.Quiz.Id == quiz.Id).ToListAsync();
                return new QuizWithQuestions(quiz, questions);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<NoContentResult> Delete(int id)
        {
            var quiz = await dbcontext.Quizzes.FirstOrDefaultAsync(q => q.Id == id);
            if (quiz != null)
            {
                dbcontext.Quizzes.Remove(quiz);
                await dbcontext.SaveChangesAsync();
            }

            return new NoContentResult();
        }

        [HttpGet("all")]
        public async Task<ActionResult<QuizListDTO>> ListQuizzes(int page, int perpage)
        {
            var count = dbcontext.Quizzes.Count();
            var list = await dbcontext.Quizzes.Skip((page - 1) * perpage).Take(perpage).Include(q => q.Creator).ToListAsync();
            return new QuizListDTO() { Count = count, Quizzes = list };
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
            var count = dbcontext.Quizzes.Where(q => q.Creator.Id == userId).Count();
            var list = await dbcontext.Quizzes.Where(q => q.Creator.Id == userId).Skip((page - 1) * perpage).Take(perpage).ToListAsync();
            return new QuizListDTO() { Count = count, Quizzes = list };
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
            var creator = await dbcontext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (creator == null)
            {
                throw new ArgumentNullException("User", "Nincs user ilyen Id-val");
            }

            var quiz = new DbQuiz()
            {
                Creator = creator,
                Title = newQuiz.title,
                Duration = newQuiz.duration,
                StartTime = DateTime.Parse(newQuiz.startTime),
                EndTime = DateTime.Parse(newQuiz.endTime),
            };

            var questions = new List<DbQuestion>();
            foreach (var question in newQuiz.questions)
            {
                QuestionType qtype;
                switch (question.type.ToLower())
                {
                    case "simple": qtype = QuestionType.Simple; break;
                    case "multiplechoice": qtype = QuestionType.MultipleChoice; break;
                    case "truefalse": qtype = QuestionType.TrueFalse; break;
                    default: qtype = QuestionType.Simple; break;
                }
                questions.Add(new DbQuestion()
                {
                    Text = question.question,
                    Type = qtype,
                    Answer = question.answer,
                    Score = question.score,
                    Options = question.options,
                    Quiz = quiz,
                });
            }
            foreach (var q in questions)
            {
                await dbcontext.Questions.AddAsync(q);
            }
            await dbcontext.Quizzes.AddAsync(quiz);
            await dbcontext.SaveChangesAsync();

            return quiz;
        }

        //[Authorize]
        [HttpGet("{quizId}/stats")]
        public async Task<ActionResult<StatsDTO>> GetStats(int quizId)
        {
            var quizStats = new StatsDTO();
            var quiz = await dbcontext.Quizzes.Include(q => q.Creator).FirstAsync(q => q.Id == quizId);
            var questions = await dbcontext.Questions.Where(q => q.Id == quiz.Id).ToListAsync();
            quizStats.QuizId = quizId;
            quizStats.QuizTitle = quiz.Title;
            quizStats.Questions = new List<QuestionStatDTO>();
            foreach (var question in questions)
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
                    questionStats.Answers = new Dictionary<string, int>();
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
                    questionStats.Answers.Add("0", trueAnswer);
                    questionStats.Answers.Add("1", falseAnswer);
                    questionStats.Options = question.Options;
                }
                if (question.Type == QuestionType.MultipleChoice)
                {
                    questionStats.Options = question.Options;
                    questionStats.Answers = new Dictionary<string, int>();
                    for (int i = 0; i < question.Options.Length; i++)
                    {
                        questionStats.Answers.Add(i.ToString(), 0);
                    }
                    foreach(var answer in answers)
                    {
                        for (int i = 0; i < question.Options.Length; i++)
                        {
                            if (answer.Answer.ToLower().Contains((char)('a' + i)))
                            {
                                questionStats.Answers[i.ToString()] += 1;
                            }
                        }
                    }
                }
                if (question.Type == QuestionType.Simple)
                {
                    questionStats.Answers = new Dictionary<string, int>();
                    foreach(var answer in answers)
                    {
                        if (questionStats.Answers.ContainsKey(answer.Answer))
                        {
                            questionStats.Answers[answer.Answer] += 1;
                        }
                        else
                        {
                            questionStats.Answers.Add(answer.Answer, 1);
                        }
                    }
                }
                quizStats.Questions.Add(questionStats);
            }

            return quizStats;
        }
    }
}
