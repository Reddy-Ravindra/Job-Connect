namespace JobConnect.Core.DTOs.Jobs;

public class JobDto
{
    public int Id { get; set; }
    public string Summary { get; set; } = null!;
    public string Body { get; set; } = null!;
    public DateTime PostedDate { get; set; }
    public bool IsActive { get; set; }
    public string PosterUsername { get; set; } = null!;
}
