using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Identity.Authentication.Models;
public sealed class SpotifyAccessTokenRequestModel
{
	[JsonPropertyName("grant_type")]
	public required string GrantType { get; set; }

	public required string Code { get; set; }

	[JsonPropertyName("redirect_uri")]
	public required string RedirectUri { get; set; }
}
