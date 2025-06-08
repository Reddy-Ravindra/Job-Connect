using JobConnect.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobConnect.API.Controllers;

[ApiController]
[Route("api/jobs/{jobId}/[controller]")]
public class InterestController : ControllerBase
{
    private readonly IInterestService _interestService;

    public InterestController(IInterestService interestService)
    {
        _interestService = interestService;
    }

    // Viewer marks interest
    [HttpPost]
    [Authorize(Roles = "viewer")]
    public async Task<IActionResult> MarkInterest(int jobId)
    {
        int userId = GetUserId();
        var success = await _interestService.MarkInterestAsync(jobId, userId);
        return success ? Ok(new { message = "Interest registered." }) : BadRequest(new { message = "Already interested or job invalid." });
    }

    // Poster sees who is interested in their job
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
