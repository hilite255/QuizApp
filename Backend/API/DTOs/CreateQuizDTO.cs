using API.DbModels;

namespace API.DTOs
{
    public class CreateQuizDTO
    {
        public string title { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public int duration { get; set; }
        public QuestionDTO[] questions { get; set; }
    }

    public class QuestionDTO
    {
        public string question { get; set; }
        public string answer { get; set; }
        public int score { get; set; } = 1;
        public string[] options { get; set; }
        public string type { get; set; }
    }
}
