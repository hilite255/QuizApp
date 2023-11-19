using System.ComponentModel.DataAnnotations.Schema;

namespace API.DbModels
{
    public class DbSubmission
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("UserId")]
        public DbUser User { get; set; }
        [ForeignKey("QuizId")]
        public DbQuiz Quiz { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Score { get; set; }
    }
}
