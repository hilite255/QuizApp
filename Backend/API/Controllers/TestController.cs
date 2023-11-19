using API.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        private readonly DatabaseContext dbcontext;
        public TestController(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        public ActionResult<List<DbUser>> GetUsers()
        {
            var user = new DbUser() { Email = "asd@asd.com", Name = "Teszt Elek" };
            var quiz = new DbQuiz() { Creator = user, Duration = new TimeSpan(0, 10, 0), Title = "TestQuiz", StartTime = DateTime.Now, EndTime = DateTime.Now.AddDays(1)};
            var question = new DbQuestion() { Quiz = quiz, Answer = "Nem tudom", Score = 0, Text = "Mi lehet?", Type = QuestionType.TrueFalse };
            var submission = new DbSubmission() { CreatedAt = DateTime.Now, Quiz = quiz, Score = 1, User = user };
            var answer = new DbAnswer() { Answer = "Pont az", IsCorrect = true, Question = question, Submission = submission };
            dbcontext.Users.Add(user);
            dbcontext.Quizzes.Add(quiz);
            dbcontext.Questions.Add(question);
            dbcontext.Submissions.Add(submission);
            dbcontext.Answers.Add(answer);
            dbcontext.SaveChanges();

            
            dbcontext.Questions.Remove(question);
            dbcontext.SaveChanges();
            
            return dbcontext.Users.ToList();
        }

        [Authorize]
        [HttpGet("hello")]
        public ActionResult<string> GetHello()
        {
            var res = "";
            foreach(var claim in User.Claims.ToList())
            {
                res += claim.Type + "    " + claim.Value + "\n";
            }
            return res;
        }
    }
}
