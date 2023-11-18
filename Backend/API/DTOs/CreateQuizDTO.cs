using API.DbModels;

namespace API.DTOs
{
    public class CreateQuizDTO
    {
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public TimeSpan Duration { get; set; }
        public QuestionDTO[] Questions { get; set; }
    }

    public class QuestionDTO
    {
        public string Text { get; set; }
        public string Answer { get; set; }
        public int Score { get; set; }
        public string[] Options { get; set; }
        public QuestionType Type { get; set; }
    }
}
