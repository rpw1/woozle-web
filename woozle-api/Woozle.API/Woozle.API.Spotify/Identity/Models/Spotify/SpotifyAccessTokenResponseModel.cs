using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Identity.Models.Spotify;
public sealed class SpotifyAccessTokenResponseModel
{
	[JsonPropertyName("access_token")]
	public required string AccessToken { get; set; }

	[JsonPropertyName("token_type")]
	public required string TokenType { get; set; }

	public required string Scope { get; set; }

	[JsonPropertyName("expires_in")]
	public required int ExpiresIn { get; set; }

	[JsonPropertyName("response_model")]
	public required string RefreshToken { get; set; }
}
