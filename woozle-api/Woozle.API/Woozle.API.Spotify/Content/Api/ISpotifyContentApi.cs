using Refit;

namespace Woozle.API.Spotify.Content.Api;

public interface ISpotifyContentApi
{
	[Post("/albums/{id}/tracks")]
	[Headers("Authorization: Bearer")]
	Task<IApiResponse<SpotifyGetSavedAlbumsResponseModel>> GetAlbumTracksAsync(
		[AliasAs("id")] string albumId,
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/me/albums")]
	[Headers("Authorization: Bearer")]
	Task<IApiResponse<SpotifyGetSavedAlbumsResponseModel>> GetSavedAlbumsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/me/following")]
	[Headers("Authorization: Bearer")]
	Task<IApiResponse<SpotifyGetFollowedArtistsResponseModel>> GetFollowedArtistsAsync(
		[Query] SpotifyGetFollowedArtistsQueryParams queryParams,
		CancellationToken cancellationToken);

	[Post("/me/playlists")]
	[Headers("Authorization: Bearer")]
	Task<IApiResponse<SpotifyGetUserPlaylistsRequest>> GetUserPlaylistsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/playlists/{id}/tracks")]
	[Headers("Authorization: Bearer")]
	Task<IApiResponse<SpotifyGetPlaylistTracksResponseModel>> GetPlaylistTracksAsync(
		[AliasAs("id")] string playlistId,
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);
}
