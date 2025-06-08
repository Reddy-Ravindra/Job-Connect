namespace JobConnect.Core.DTOs.Jobs;

public class CreateJobDto
{
    public string Summary { get; set; } = null!;
    public string Body { get; set; } = null!;
}
