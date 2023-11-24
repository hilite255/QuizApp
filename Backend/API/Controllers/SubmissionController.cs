using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/submission")]
    [ApiController]
    public class SubmissionController : ControllerBase
    {
        private readonly DatabaseContext dbcontext;
        public SubmissionController(DatabaseContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpPost("submit/{quizId}")]
        [Authorize]
        public async Task<ActionResult<DbSubmission>> Submit(int quizId, [FromBody] SubmissionDTO newSubmission)
        {
            var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var dbuser = await dbcontext.Users.FirstAsync(u => u.Id == userId);
            var quiz = await dbcontext.Quizzes.FirstOrDefaultAsync(q => q.Id == quizId);
            if (quiz == null) return BadRequest("Quiz doesn't exist with this id: " + quizId);
            var submission = new DbSubmission() { Quiz = quiz, CreatedAt = DateTime.Now, User = dbuser };
            var score = 0;
            foreach (var answer in newSubmission.Answers)
            {
                var question = await dbcontext.Questions.FirstAsync(q => q.Id == answer.QuestionId);
                var newAnswer = new DbAnswer() { Answer = answer.Answer, Question = question, Submission = submission, IsCorrect = false };
                if (question.Type == QuestionType.MultipleChoice)
                {
                    var wrongAnswers = new List<string>();
                    var goodAnswers = question.Answer.Split(',');
                    foreach (var choice in answer.Answer.Split(','))
                    {
                        if (!goodAnswers.Contains(choice))
                        {
                            wrongAnswers.Add(choice);
                        }
                    }
                    if (wrongAnswers.Count == 0)
                    {
                        score += question.Score;
                        newAnswer.IsCorrect = true;
                    }
                }
                else
                {
                    if (question.Answer == answer.Answer)
                    {
                        score += question.Score;
                        newAnswer.IsCorrect = true;
                    }
                }
                await dbcontext.Answers.AddAsync(newAnswer);
            }
            submission.Score = score;
            await dbcontext.Submissions.AddAsync(submission);
            await dbcontext.SaveChangesAsync();
            return submission;
        }

        [HttpGet("{quizId}")]
        public async Task<ActionResult<List<DbSubmission>>> ListSubmissionsForQuiz(int quizId)
        {
            return await dbcontext.Submissions.Where(s => s.Quiz.Id == quizId).ToListAsync();
        }
    }
}
