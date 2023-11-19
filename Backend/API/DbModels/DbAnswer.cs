using System.ComponentModel.DataAnnotations.Schema;

namespace API.DbModels
{
    public class DbAnswer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("QuestionId")]
        public DbQuestion Question { get; set; }
        [ForeignKey("SubmissionId")]
        public DbSubmission Submission { get; set; }
        public string Answer { get; set; }
        public bool IsCorrect { get; set; }
    }
}
