using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Identity.Authorization.Models;

public sealed class SpotifyAuthorizationRequestModel
{
	[JsonPropertyName("client_id")]
	public required string ClientId { get; set; }

	[JsonPropertyName("response_type")]
	public required string ResponseType { get; set; }

	[JsonPropertyName("redirect_uri")]
	public required string RedirectUri { get; set; }

	public string? State { get; set; }

	public string? Scope { get; set; }

	public bool? ShowDialog { get; set; }
}
