using JobConnect.Core.DTOs.Interest;
using JobConnect.Core.Entities;
using JobConnect.Core.Interfaces;
using JobConnect.Data;
using Microsoft.EntityFrameworkCore;

namespace JobConnect.Services.Interests;

public class InterestService : IInterestService
{
    private readonly ApplicationDbContext _context;

    public InterestService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> MarkInterestAsync(int jobId, int userId)
    {
        var job = await _context.Jobs.FindAsync(jobId);
        if (job == null || !job.IsActive || job.PostedDate < DateTime.UtcNow.AddMonths(-2))
            return false;

        bool alreadyInterested = await _context.Interests
            .AnyAsync(i => i.JobId == jobId && i.UserId == userId);

        if (alreadyInterested)
            return false;

        var interest = new Interest
        {
            JobId = jobId,
            UserId = userId,
            InterestedAt = DateTime.UtcNow
        };

        _context.Interests.Add(interest);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsUserInterestedAsync(int jobId, int userId)
    {
        return await _context.Interests.AnyAsync(i => i.JobId == jobId && i.UserId == userId);
    }

    public async Task<bool> RemoveInterestAsync(int jobId, int userId)
    {
        var interest = await _context.Interests
            .FirstOrDefaultAsync(i => i.JobId == jobId && i.UserId == userId);
    
        if (interest == null) return false;
    
        _context.Interests.Remove(interest);
        await _context.SaveChangesAsync();
        return true;
    }

    // public async Task<List<InterestDto>> GetInterestedUsersAsync(int jobId, int posterId)
    // {
    //     var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == jobId && j.PosterId == posterId);
    //     if (job == null)
    //         throw new UnauthorizedAccessException("You are not the owner of this job.");

    //     var interestedUsers = await _context.Interests
    //         .Where(i => i.JobId == jobId)
    //         .Include(i => i.User)
    //         .OrderByDescending(i => i.InterestedAt)
    //         .ToListAsync();

    //     return interestedUsers.Select(i => new InterestDto
    //     {
    //         JobId = i.JobId,
    //         UserId = i.UserId,
    //         Username = i.User!.Username,
    //         InterestedAt = i.InterestedAt
    //     }).ToList();
    // }
    public async Task<List<InterestDto>> GetInterestedUsersAsync(int jobId, int posterId)
    {
        var job = await _context.Jobs
            .Include(j => j.InterestedUsers) // ✅ Must match navigation property
            .ThenInclude(i => i.User)
            .FirstOrDefaultAsync(j => j.Id == jobId);
    
        if (job == null || job.PosterId != posterId)
            throw new UnauthorizedAccessException("Not your job.");
    
        return job.InterestedUsers
            .Select(i => new InterestDto
            {
                UserId = i.UserId,
                // Username = i.User.Username,
                // Email = i.User.Email
                Username = i.User?.Username ?? "Unknown",
                Email = i.User?.Email ?? "unknown@example.com"
            })
            .ToList();
    }

}
