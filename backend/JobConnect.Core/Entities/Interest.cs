namespace JobConnect.Core.Entities;

public class Interest
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int JobId { get; set; }

    public DateTime InterestedAt { get; set; } = DateTime.UtcNow;

   
    public User? User { get; set; }

    public Job? Job { get; set; }
}
