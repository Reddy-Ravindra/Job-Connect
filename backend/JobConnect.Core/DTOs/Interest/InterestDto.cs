namespace JobConnect.Core.DTOs.Interest;

public class InterestDto
{
    public int JobId { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; } = null!;
    public DateTime InterestedAt { get; set; }
}
