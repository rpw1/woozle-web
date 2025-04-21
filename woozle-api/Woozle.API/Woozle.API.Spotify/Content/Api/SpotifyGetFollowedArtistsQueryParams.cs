using Refit;

namespace Woozle.API.Spotify.Content.Api;

public sealed class SpotifyGetFollowedArtistsQueryParams
{
	[AliasAs("type")]
	public string Type { get; } = "artist";

	[AliasAs("after")]
	public string? After { get; set; }

	[AliasAs("limit")]
	public int? Limit { get; set; }
}
