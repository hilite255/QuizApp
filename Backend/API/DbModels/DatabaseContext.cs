using Microsoft.EntityFrameworkCore;

namespace API.DbModels
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) { }
        public DatabaseContext() : base() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbQuiz>().HasOne(e => e.Creator).WithMany().OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<DbQuiz>().HasMany(e => e.Questions).WithOne(e => e.Quiz);
            modelBuilder.Entity<DbSubmission>().HasOne(e => e.User).WithMany().OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<DbAnswer>().HasOne(e => e.Submission).WithMany().OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<DbQuestion>()
                .Property(e => e.Options)
                .HasConversion(
                v => string.Join("&$", v),
                v => v.Split("&$", StringSplitOptions.RemoveEmptyEntries)
                );
        }

        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbQuiz> Quizzes { get; set; }
        public DbSet<DbQuestion> Questions { get; set; }
        public DbSet<DbSubmission> Submissions { get; set; }
        public DbSet<DbAnswer> Answers { get; set; }
    }
}
