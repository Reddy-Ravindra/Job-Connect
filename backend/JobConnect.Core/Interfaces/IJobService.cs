using JobConnect.Core.DTOs.Jobs;

namespace JobConnect.Core.Interfaces;

public interface IJobService
{
    Task<JobDto> CreateJobAsync(CreateJobDto dto, int posterId);
    Task<List<JobDto>> GetAllActiveJobsAsync();
    Task<JobDto> GetJobByIdAsync(int id);
    Task<bool> UpdateJobAsync(int id, int posterId, UpdateJobDto dto);
    Task<bool> DeleteJobAsync(int id, int posterId);

    Task<List<JobDto>> GetJobsByPosterAsync(int posterId);
    Task<object> GetPagedJobsAsync(int page, int pageSize);
}
