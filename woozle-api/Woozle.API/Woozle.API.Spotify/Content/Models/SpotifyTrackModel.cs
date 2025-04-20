using System.Text.Json.Serialization;
using Woozle.API.Spotify.Models;

namespace Woozle.API.Spotify.Content.Models;

public sealed class SpotifyTrackModel : SpotifyBaseModel
{
	[JsonPropertyName("album")]
	public required SpotifyAlbumModel Album { get; set; }

	[JsonPropertyName("artists")]
	public ICollection<SpotifySimplifiedArtistModel> Artists { get; set; } = [];

	[JsonPropertyName("duration_ms")]
	public required int DurationInMs { get; set; }

	[JsonPropertyName("explicit")]
	public bool Explicit { get; set; }

	[JsonPropertyName("is_playable")]
	public required bool IsPlayable { get; set; }

	[JsonPropertyName("name")]
	public required string Name { get; set; }

	[JsonPropertyName("popularity")]
	public required int Popularity { get; set; }

	[JsonPropertyName("track_number")]
	public required int TrackNumber { get; set; }
}
