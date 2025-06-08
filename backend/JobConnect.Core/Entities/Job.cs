namespace JobConnect.Core.Entities;

public class Job
{
    public int Id { get; set; }

    public string Summary { get; set; } = null!;

    public string Body { get; set; } = null!;

    public DateTime PostedDate { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    public int PosterId { get; set; }

    // Navigation
    public User? Poster { get; set; }

    public ICollection<Interest>? InterestedUsers { get; set; }
}
