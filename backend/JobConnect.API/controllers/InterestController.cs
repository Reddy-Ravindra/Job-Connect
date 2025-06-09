using JobConnect.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobConnect.API.Controllers;

[ApiController]
[Route("api/jobs/{jobId}/interest")]
public class InterestController : ControllerBase
{
    private readonly IInterestService _interestService;

    public InterestController(IInterestService interestService)
    {
        _interestService = interestService;
    }

    [HttpPost]
    [Authorize(Roles = "viewer")]
    public async Task<IActionResult> MarkInterest(int jobId)
    {
        int userId = GetUserId();
        var success = await _interestService.MarkInterestAsync(jobId, userId);
        return success ? Ok(new { message = "Interest registered." }) : BadRequest(new { message = "Already interested or job invalid." });
    }

    [HttpDelete]
    [Authorize(Roles = "viewer")]
    public async Task<IActionResult> RemoveInterest(int jobId)
    {
        int userId = GetUserId();
        var removed = await _interestService.RemoveInterestAsync(jobId, userId);
        return removed ? Ok(new { message = "Interest removed." }) : NotFound(new { message = "Not marked as interested." });
    }

    [HttpGet("status")]
    [Authorize(Roles = "viewer")]
    public async Task<IActionResult> IsInterested(int jobId)
    {
        int userId = GetUserId();
        bool isInterested = await _interestService.IsUserInterestedAsync(jobId, userId);
        return Ok(new { interested = isInterested });
    }

    [HttpGet]
    [Authorize(Roles = "poster")]
    public async Task<IActionResult> GetInterestedUsers(int jobId)
    {
        int posterId = GetUserId();
        try
        {
            var users = await _interestService.GetInterestedUsersAsync(jobId, posterId);
            return Ok(users);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    private int GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (claim == null)
            throw new UnauthorizedAccessException("User ID not found in token.");
        return int.Parse(claim.Value);
    }
}
