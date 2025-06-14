namespace JobConnect.Core.Entities;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string Role { get; set; } = "viewer"; 

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Job>? PostedJobs { get; set; }

    public ICollection<Interest>? Interests { get; set; }
}
