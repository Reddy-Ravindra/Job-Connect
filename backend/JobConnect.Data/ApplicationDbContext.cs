using Microsoft.EntityFrameworkCore;
using JobConnect.Core.Entities;

namespace JobConnect.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) {}

    public DbSet<User> Users => Set<User>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<Interest> Interests => Set<Interest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Interest>()
            .HasIndex(i => new { i.UserId, i.JobId })
            .IsUnique();

        modelBuilder.Entity<Job>()
            .HasOne(j => j.Poster)
            .WithMany(u => u.PostedJobs)
            .HasForeignKey(j => j.PosterId);

        modelBuilder.Entity<Interest>()
            .HasOne(i => i.User)
            .WithMany(u => u.Interests)
            .HasForeignKey(i => i.UserId);

        modelBuilder.Entity<Interest>()
            .HasOne(i => i.Job)
            .WithMany(j => j.InterestedUsers)
            .HasForeignKey(i => i.JobId);
    }
}
