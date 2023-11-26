using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.Contract
{
    public interface IQuizService
    {
        Task<ActionResult<QuizWithQuestions>> GetQuiz(int id);

        Task<NoContentResult> Delete(int id);

        Task<ActionResult<QuizListDTO>> ListQuizzes(int page, int perpage);

        Task<ActionResult<QuizListDTO>> GetQuizzesForUser(int page, int perpage, string userId);

        Task<ActionResult<DbQuiz>> CreateQuiz(CreateQuizDTO newQuiz, string userId);

        Task<ActionResult<StatsDTO>> GetStats(int quizId);
    }
}
