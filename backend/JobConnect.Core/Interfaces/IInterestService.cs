using JobConnect.Core.DTOs.Interest;

namespace JobConnect.Core.Interfaces;

public interface IInterestService
{
    Task<bool> MarkInterestAsync(int jobId, int userId);
    Task<bool> IsUserInterestedAsync(int jobId, int userId);
    Task<List<InterestDto>> GetInterestedUsersAsync(int jobId, int posterId);
    Task<bool> RemoveInterestAsync(int jobId, int userId);
}
