using System.Collections.Generic;
using Woozle.API.Features.Content.Extensions;
using Woozle.API.Features.Content.Models;
using Woozle.API.Spotify;
using Woozle.API.Spotify.Content;
using Woozle.API.Spotify.Content.Api;

namespace Woozle.API.Features.Content;

[ServiceRegistration(ServiceLifeTimeRegistrationType.Scoped)]
public sealed class SpotifyContentService
{
	private readonly ISpotifyClientContentService _spotifyClientContentService;

	public SpotifyContentService(ISpotifyClientContentService spotifyClientContentService)
	{
		_spotifyClientContentService = spotifyClientContentService ?? throw new ArgumentNullException(nameof(spotifyClientContentService));
	}

	public async Task<List<TrackModel>> GetAlbumnTracksAsync(string albumId, CancellationToken cancellationToken)
	{
		var album = await _spotifyClientContentService.GetSpotifyAlbumnAsync(albumId, cancellationToken);
		if (album is null)
		{
			return [];
		}

		var albumImage = album.Images.First().ToDto();

		var response = await _spotifyClientContentService.GetSpotifyAlbumnTracksAsync(albumId, cancellationToken);

		if (response is null)
		{
			return [];
		}

		List<TrackModel> tracks = [..response.Items.Select(track => track.ToDto(albumImage))];

		var expandFunction = (int offset) => _spotifyClientContentService.GetSpotifyAlbumnTracksAsync(albumId, cancellationToken, new(offset));

		await foreach (var request in expandFunction.Expand(response.Total, SpotifyConstants.ApiResultLimit))
		{
			var result = await request;
			tracks.AddRange(result?.Items.Select(track => track.ToDto(albumImage)) ?? []);
		}

		return tracks;
	}

	public async Task<List<ContentModel>> GetSavedAlbumsAsync(CancellationToken cancellationToken)
	{
		var response = await _spotifyClientContentService.GetSpotifySavedAlbumsAsync(cancellationToken);

		if (response is null)
		{
			return [];
		}

		List<ContentModel> albums = [.. response.Items.Select(album => album.ToDto())];

		var expandFunction = (int offset) => _spotifyClientContentService.GetSpotifySavedAlbumsAsync(cancellationToken, new(offset));

		await foreach (var request in expandFunction.Expand(response.Total, SpotifyConstants.ApiResultLimit))
		{
			var result = await request;
			albums.AddRange(result?.Items.Select(album => album.ToDto()) ?? []);
		}

		return albums;
	}

	public async Task<List<ContentModel>> GetFollowedArtistsAsync(CancellationToken cancellationToken)
	{
		SpotifyGetFollowedArtistsResponseModel? response;
		SpotifyGetFollowedArtistsQueryParams queryParams = new();
		List<ContentModel> artists = [];

		do
		{
			response = await _spotifyClientContentService.GetSpotifyFollowedArtistsAsync(cancellationToken, queryParams);

			artists.AddRange(response?.Artists.Items.Select(artist => artist.ToDto()) ?? []);

			queryParams.After = response?.Artists.Cursors.After;
		}
		while (response?.Artists.Next is not null);

		return artists;
	}

	public async Task<List<ContentModel>> GetUserPlaylistsAsync(CancellationToken cancellationToken)
	{
		var response = await _spotifyClientContentService.GetSpotifyUserPlaylistsAsync(cancellationToken);

		if (response is null)
		{
			return [];
		}

		List<ContentModel> playlists = [.. response.Items.Select(playlist => playlist.ToDto())];

		var expandFunction = (int offset) => _spotifyClientContentService.GetSpotifyUserPlaylistsAsync(cancellationToken, new(offset));

		await foreach (var request in expandFunction.Expand(response.Total, SpotifyConstants.ApiResultLimit))
		{
			var result = await request;
			playlists.AddRange(result?.Items.Select(playlist => playlist.ToDto()) ?? []);
		}

		return playlists;
	}

	public async Task<List<TrackModel>> GetPlaylistTracksAsync(string playlistId, CancellationToken cancellationToken)
	{
		var response = await _spotifyClientContentService.GetSpotifyPlaylistTracksAsync(playlistId, cancellationToken);

		if (response is null)
		{
			return [];
		}

		List<TrackModel> tracks = [.. response.Items.Where(item => item.Track is not null).Select(track => track.ToDto())];

		var expandFunction = (int offset) => _spotifyClientContentService.GetSpotifyPlaylistTracksAsync(playlistId, cancellationToken, new(offset));

		await foreach (var request in expandFunction.Expand(response.Total, SpotifyConstants.ApiResultLimit))
		{
			var result = await request;
			tracks.AddRange(result?.Items.Where(item => item.Track is not null).Select(track => track.ToDto()) ?? []);
		}

		return tracks;
	}
}
