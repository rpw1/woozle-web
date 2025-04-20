using Refit;
using Woozle.API.Spotify.Identity.Api;

namespace Woozle.API.Spotify.Content.Api;

public interface ISpotifyContentApi
{
	[Post("/me/albums")]
	Task<IApiResponse<SpotifyAccessTokenResponseModel>> GetSavedAlbumsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/me/following")]
	Task<IApiResponse<SpotifyGetFollowedArtistsResponseModel>> GetFollowedArtistsAsync(
		[Query] string type,
		[Query] string after,
		[Query] int limit,
		CancellationToken cancellationToken);

	[Post("/me/playlists")]
	Task<IApiResponse<SpotifyGetUserPlaylistsRequest>> GetUserPlaylistsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/playlists/{id}/tracks")]
	Task<IApiResponse<SpotifyGetPlaylistTracksResponseModel>> GetPlaylistTracksAsync(
		[AliasAs("id")] string playlistId,
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);
}
