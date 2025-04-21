using Woozle.API.Spotify.Content.Api;

namespace Woozle.API.Spotify.Content;

public interface ISpotifyClientContentService
{
	Task<SpotifyGetSavedAlbumsResponseModel?> GetSpotifyAlbumnTracksAsync(string albumId, int limit, int offset, CancellationToken cancellationToken);

	Task<SpotifyGetSavedAlbumsResponseModel?> GetSpotifySavedAlbumsAsync(int limit, int offset, CancellationToken cancellationToken);

	Task<SpotifyGetFollowedArtistsResponseModel?> GetSpotifyFollowedArtistsAsync(SpotifyGetFollowedArtistsQueryParams queryParams, CancellationToken cancellationToken);

	Task<SpotifyGetUserPlaylistsRequest?> GetSpotifyUserPlaylistsAsync(int limit, int offset, CancellationToken cancellationToken);

	Task<SpotifyGetPlaylistTracksResponseModel?> GetSpotifyPlaylistTracksAsync(string playlistId, int limit, int offset, CancellationToken cancellationToken);
}
