namespace Woozle.API.Features.Identity.Spotify.Models;

public sealed class ClientRefreshTokenRequestModel
{
	public required string RefreshToken { get; set; }
}
