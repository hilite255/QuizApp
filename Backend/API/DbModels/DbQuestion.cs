using System.ComponentModel.DataAnnotations.Schema;

namespace API.DbModels
{
    public class DbQuestion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("QuizId")]
        public DbQuiz Quiz { get; set; }
        public QuestionType Type { get; set; }
        public string Text { get; set; }
        public string Answer { get; set; }
        public int Score { get; set; }
        public string[]? Options { get; set; }
    }

    public enum QuestionType
    {
        TrueFalse,
        MultipleChoice,
        Simple,
    }
}
