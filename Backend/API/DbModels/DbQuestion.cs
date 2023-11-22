using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.DbModels
{
    public class DbQuestion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("QuizId")]
        public DbQuiz Quiz { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
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
