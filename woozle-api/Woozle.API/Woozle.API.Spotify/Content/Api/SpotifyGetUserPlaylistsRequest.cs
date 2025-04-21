using System.Text.Json.Serialization;

namespace Woozle.API.Spotify.Content.Api;

public sealed class SpotifyGetUserPlaylistsRequest
{
	[JsonPropertyName("limit")]
	public int Limit { get; set; } = 50;

	[JsonPropertyName("offset")]
	public int Offset { get; set; } = 0;
}
