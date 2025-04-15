namespace Woozle.API.Spotify.Identity.Models.Client;

public sealed class ClientRefreshTokenRequestModel
{
	public required string RefreshToken { get; set; }
}
