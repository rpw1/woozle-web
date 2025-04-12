using Microsoft.AspNetCore.Mvc;
using Woozle.API.Attributes;
using Woozle.API.Spotify.Identity.Models.Client;

namespace Woozle.API.Controllers;

[ApiController]
[Route("spotify/identity")]
public sealed class SpotifyIdentityController : ControllerBase
{


	[SpotifyAuthorization]
	[HttpPost("/accessToken")]
	public IActionResult RequestSpotifyAccessTokenAsync([FromBody] ClientAccessTokenRequestModel request)
	{
		return Ok();
	}
}
