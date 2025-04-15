namespace Woozle.API.Spotify.Identity.Models.Client;

public sealed class ClientAccessTokenResponseModel
{
	public required string AccessToken { get; set; }

	public required int ExpiresIn { get; set; }

	public string? RefreshToken { get; set; }

	public required string Scope { get; set; }

	public required string TokenType { get; set; }
}
