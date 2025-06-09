namespace JobConnect.Core.DTOs.Interest;

public class InterestDto
{
    public int JobId { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; } = null!;
     public string Email { get; set; } = string.Empty;
    public DateTime InterestedAt { get; set; }
}
