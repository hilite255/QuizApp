using API.DbModels;

namespace API.DTOs
{
    public class QuizWithQuestions
    {
        public int Id { get; set; }
        public DbUser Creator { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Duration { get; set; }
        public List<DbQuestion> Questions { get; set; }

        public QuizWithQuestions(DbQuiz quiz, List<DbQuestion> questions)
        {
            Id = quiz.Id;
            Creator = quiz.Creator;
            Title = quiz.Title;
            StartTime = quiz.StartTime;
            EndTime = quiz.EndTime;
            Duration = quiz.Duration;
            Questions = questions;
            foreach (var q in Questions)
            {
                q.Answer = "";
            }
        }
    }
}
