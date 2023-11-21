namespace API.DTOs
{
    public class SubmissionDTO
    {
        public AnswerDTO[] Answers { get; set; }
    }

    public class AnswerDTO
    {
        public int QuestionId { get; set; }
        public string Answer { get; set; }
    }
}
