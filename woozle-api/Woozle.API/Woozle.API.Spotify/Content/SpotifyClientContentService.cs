using Woozle.API.Spotify.Content.Api;

namespace Woozle.API.Spotify.Content;

[ServiceRegistration(ServiceLifeTimeRegistrationType.Scoped)]
public sealed class SpotifyClientContentService : ISpotifyClientContentService
{
	private readonly ISpotifyContentApi _spotifyContentApi;

	public SpotifyClientContentService(ISpotifyContentApi spotifyContentApi)
	{
		_spotifyContentApi = spotifyContentApi ?? throw new ArgumentNullException(nameof(spotifyContentApi));
	}

	public async Task<SpotifyGetSavedAlbumsResponseModel?> GetSpotifyAlbumnTracksAsync(string albumId, int limit, int offset, CancellationToken cancellationToken)
	{
		var response = await _spotifyContentApi.GetAlbumTracksAsync(albumId, limit, offset, cancellationToken);

		return response.Content;
	}

	public async Task<SpotifyGetSavedAlbumsResponseModel?> GetSpotifySavedAlbumsAsync(int limit, int offset, CancellationToken cancellationToken)
	{
		var response = await _spotifyContentApi.GetSavedAlbumsAsync(limit, offset, cancellationToken);

		return response.Content;
	}

	public async Task<SpotifyGetFollowedArtistsResponseModel?> GetSpotifyFollowedArtistsAsync(SpotifyGetFollowedArtistsQueryParams queryParams, CancellationToken cancellationToken)
	{
		var response = await _spotifyContentApi.GetFollowedArtistsAsync(queryParams, cancellationToken);

		return response.Content;
	}

	public async Task<SpotifyGetUserPlaylistsRequest?> GetSpotifyUserPlaylistsAsync(int limit, int offset, CancellationToken cancellationToken)
	{
		var response = await _spotifyContentApi.GetUserPlaylistsAsync(limit, offset, cancellationToken);

		return response.Content;
	}

	public async Task<SpotifyGetPlaylistTracksResponseModel?> GetSpotifyPlaylistTracksAsync(string playlistId, int limit, int offset, CancellationToken cancellationToken)
	{
		var response = await _spotifyContentApi.GetPlaylistTracksAsync(playlistId, limit, offset, cancellationToken);

		return response.Content;
	}
}
