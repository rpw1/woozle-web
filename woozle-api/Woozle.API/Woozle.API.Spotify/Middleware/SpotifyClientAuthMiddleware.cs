using Microsoft.Extensions.Options;

namespace Woozle.API.Spotify.Middleware;

public sealed class SpotifyClientAuthMiddleware : DelegatingHandler
{
	private readonly SpotifySettings _spotifySettings;

	public SpotifyClientAuthMiddleware(IOptions<SpotifySettings> spotifySettings)
	{
		_spotifySettings = spotifySettings.Value ?? throw new ArgumentNullException(nameof(spotifySettings));
	}
}
