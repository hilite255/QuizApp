using API.DbModels;

namespace API.DTOs
{
    public class StatsDTO
    {
        public int QuizId { get; set; }
        public string QuizTitle { get; set; }
        public List<QuestionStatDTO> Questions { get; set; }
    }

    public class QuestionStatDTO
    {
        public int QuestionId { get; set;}
        public string Text { get; set;}
        public string QuestionType { get; set;}
        public int Correct { get; set;}
        public int Wrong { get; set;}
        public Dictionary<int, int> Answers { get; set; }
        public string[]? Options { get; set;}
    }
}
