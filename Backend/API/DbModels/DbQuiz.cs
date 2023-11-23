﻿using System.ComponentModel.DataAnnotations.Schema;

namespace API.DbModels
{
    public class DbQuiz
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public DbUser Creator { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Duration { get; set; }
    }
}
