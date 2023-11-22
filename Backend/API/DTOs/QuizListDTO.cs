using API.DbModels;

namespace API.DTOs
{
    public class QuizListDTO
    {
        public int Count { get; set; }
        public List<DbQuiz> Quizzes { get; set; }
    }
}
