using Woozle.API.Spotify.Identity.Models;

namespace Woozle.API.Spotify.Identity;

public interface ISpotifyClientIdentityService
{
	Task<SpotifyAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(SpotifyAccessTokenRequestModel request, CancellationToken cancellationToken);

	Task<SpotifyAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(SpotifyRefreshTokenRequestModel request, CancellationToken cancellationToken);
}
