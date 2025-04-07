namespace Woozle.API.Spotify.Identity.Authorization.Models;
public sealed class SpotifyAuthorizationResponseModel
{
	public string? Code { get; set; }

	public string? Error { get; set; }

	public required string State { get; set; }
}
