using Microsoft.AspNetCore.Mvc;
using Woozle.API.Features.Identity.Spotify;
using Woozle.API.Features.Identity.Spotify.Models;
using Woozle.API.Spotify.Identity;

namespace Woozle.API.Controllers;

[ApiController]
[Route("api/spotify/identity")]
public sealed class SpotifyIdentityController : ControllerBase
{
	private readonly ISpotifyIdentityService _spotifyIdentityService;

	public SpotifyIdentityController(ISpotifyIdentityService spotifyIdentityService)
	{
		_spotifyIdentityService = spotifyIdentityService ?? throw new ArgumentNullException(nameof(spotifyIdentityService));
	}

	[HttpPost("accessToken")]
	public async Task<IActionResult> RequestSpotifyAccessTokenAsync([FromBody] ClientAccessTokenRequestModel request, CancellationToken cancellationToken)
	{
		return Ok(await _spotifyIdentityService.RequestSpotifyAccessTokenAsync(request, cancellationToken));
	}

	[HttpPost("refreshToken")]
	public async Task<IActionResult> RefreshSpotifyAccessTokenAsync([FromBody] ClientRefreshTokenRequestModel request, CancellationToken cancellationToken)
	{
		return Ok(await _spotifyIdentityService.RequestSpotifyAccessTokenAsync(request, cancellationToken));
	}
}
