using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Identity.Models.Spotify;
public sealed class SpotifyAccessTokenRequestModel
{
	[JsonPropertyName("grant_type")]
	public static string GrantType => "authorization_code";

	public required string Code { get; set; }

	[JsonPropertyName("redirect_uri")]
	public required string RedirectUri { get; set; }
}
