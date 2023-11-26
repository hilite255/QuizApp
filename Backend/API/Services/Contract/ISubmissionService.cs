using API.DbModels;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.Contract
{
    public interface ISubmissionService
    {
        Task<ActionResult<DbSubmission>> Submit(int quizId, SubmissionDTO newSubmission, string userId);

        Task<ActionResult<List<DbSubmission>>> ListSubmissionsForQuiz(int quizId);
    }
}
