using Refit;
using Woozle.API.Spotify.Identity.Models;

namespace Woozle.API.Spotify.Identity;

public interface ISpotifyIdentityApi
{
	[Post("/me/albums")]
	Task<IApiResponse<SpotifyAccessTokenResponseModel>> GetSavedAlbumsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	[Post("/me/following")]
	Task<IApiResponse<SpotifyAccessTokenResponseModel>> GetSavedArtistsAsync(
		[Query] string type,
		[Query] string after,
		[Query] int limit,
		CancellationToken cancellationToken);

	[Post("/me/playlists")]
    Task<IApiResponse<SpotifyAccessTokenResponseModel>> GetSavedPlaylistsAsync(
		[Query] int limit,
		[Query] int offset,
		CancellationToken cancellationToken);

	
}
