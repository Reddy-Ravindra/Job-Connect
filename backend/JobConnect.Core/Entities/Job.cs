using System.Collections.Generic;

namespace JobConnect.Core.Entities;

public class Job
{
    public int Id { get; set; }
    public string Summary { get; set; } = null!;
    public string Body { get; set; } = null!;
    public DateTime PostedDate { get; set; }
    public bool IsActive { get; set; }

    public int PosterId { get; set; }

    public User? Poster { get; set; }
    public ICollection<Interest> InterestedUsers { get; set; } = new List<Interest>();
}
