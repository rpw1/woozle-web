using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Identity.Models.Spotify;

public sealed class SpotifyRefreshTokenRequestModel
{
	[JsonPropertyName("grant_type")]
	public static string GrantType => "refresh_token";

	[JsonPropertyName("refresh_token")]
	public required string RefreshToken { get; set; }
}
