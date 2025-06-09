using JobConnect.Core.DTOs.Jobs;
using JobConnect.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobConnect.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllJobs()
    {
        var jobs = await _jobService.GetAllActiveJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetJob(int id)
    {
        try
        {
            var job = await _jobService.GetJobByIdAsync(id);
            return Ok(job);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "poster")]
    public async Task<IActionResult> CreateJob([FromBody] CreateJobDto dto)
    {
        var userId = GetUserId();
        var job = await _jobService.CreateJobAsync(dto, userId);
        return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "poster")]
    public async Task<IActionResult> UpdateJob(int id, [FromBody] UpdateJobDto dto)
    {
        var userId = GetUserId();
        var updated = await _jobService.UpdateJobAsync(id, userId, dto);
        return updated ? Ok() : Forbid();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "poster")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        var userId = GetUserId();
        var deleted = await _jobService.DeleteJobAsync(id, userId);
        return deleted ? NoContent() : Forbid();
    }
    

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) throw new UnauthorizedAccessException("User not authenticated.");
        return int.Parse(userIdClaim.Value);
    }
}
