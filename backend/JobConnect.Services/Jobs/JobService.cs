using JobConnect.Core.DTOs.Jobs;
using JobConnect.Core.Entities;
using JobConnect.Core.Interfaces;
using JobConnect.Data;
using Microsoft.EntityFrameworkCore;

namespace JobConnect.Services.Jobs;

public class JobService : IJobService
{
    private readonly ApplicationDbContext _context;

    public JobService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto dto, int posterId)
    {
        var job = new Job
        {
            Summary = dto.Summary,
            Body = dto.Body,
            PosterId = posterId,
            PostedDate = DateTime.UtcNow,
            IsActive = true
        };

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();

        return MapToDto(job, await GetPosterUsername(posterId));
    }

    public async Task<List<JobDto>> GetJobsByPosterAsync(int posterId)
    {
        var twoMonthsAgo = DateTime.UtcNow.AddMonths(-2);
        var jobs = await _context.Jobs
            .Include(j => j.Poster)
            .Where(j => j.PosterId == posterId && j.IsActive && j.PostedDate > twoMonthsAgo)
            .OrderByDescending(j => j.PostedDate)
            .ToListAsync();

        return jobs.Select(j => new JobDto
        {
            Id = j.Id,
            Summary = j.Summary,
            Body = j.Body,
            PostedDate = j.PostedDate,
            IsActive = j.IsActive,
            PosterUsername = j.Poster?.Username ?? "Unknown"
        }).ToList();
    }


    public async Task<List<JobDto>> GetAllActiveJobsAsync()
    {
        var twoMonthsAgo = DateTime.UtcNow.AddMonths(-2);
        var jobs = await _context.Jobs
            .Include(j => j.Poster)
            .Where(j => j.IsActive && j.PostedDate > twoMonthsAgo)
            .OrderByDescending(j => j.PostedDate)
            .ToListAsync();

        return jobs.Select(j => MapToDto(j, j.Poster?.Username ?? "Unknown")).ToList();
    }

    public async Task<JobDto> GetJobByIdAsync(int id)
    {
        var job = await _context.Jobs.Include(j => j.Poster).FirstOrDefaultAsync(j => j.Id == id);
        if (job == null || !job.IsActive || job.PostedDate < DateTime.UtcNow.AddMonths(-2))
            throw new Exception("Job not found or expired.");

        return MapToDto(job, job.Poster?.Username ?? "Unknown");
    }

    public async Task<bool> UpdateJobAsync(int id, int posterId, UpdateJobDto dto)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job == null || job.PosterId != posterId)
            return false;

        job.Summary = dto.Summary;
        job.Body = dto.Body;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteJobAsync(int id, int posterId)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job == null || job.PosterId != posterId)
            return false;

        _context.Jobs.Remove(job);
        await _context.SaveChangesAsync();
        return true;
    }

    // Helper
    private JobDto MapToDto(Job job, string username) => new JobDto
    {
        Id = job.Id,
        Summary = job.Summary,
        Body = job.Body,
        PostedDate = job.PostedDate,
        IsActive = job.IsActive,
        PosterUsername = username
    };

    private async Task<string> GetPosterUsername(int posterId)
    {
        var user = await _context.Users.FindAsync(posterId);
        return user?.Username ?? "Unknown";
    }

    public async Task<object> GetPagedJobsAsync(int page, int pageSize)
    {
        var twoMonthsAgo = DateTime.UtcNow.AddMonths(-2);
        var query = _context.Jobs
            .Include(j => j.Poster)
            .Where(j => j.IsActive && j.PostedDate > twoMonthsAgo)
            .OrderByDescending(j => j.PostedDate);
    
        var totalItems = await query.CountAsync();
        var jobs = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    
        var jobDtos = jobs.Select(j => new JobDto
        {
            Id = j.Id,
            Summary = j.Summary,
            Body = j.Body,
            PostedDate = j.PostedDate,
            IsActive = j.IsActive,
            PosterUsername = j.Poster?.Username ?? "Unknown"
        }).ToList();
    
        return new
        {
            items = jobDtos,
            totalItems,
            totalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
        };
    }
}
