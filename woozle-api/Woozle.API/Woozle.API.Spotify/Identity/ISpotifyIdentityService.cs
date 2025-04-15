using Woozle.API.Spotify.Identity.Models.Client;

namespace Woozle.API.Spotify.Identity;

public interface ISpotifyIdentityService
{
	Task<ClientAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(ClientAccessTokenRequestModel request, CancellationToken cancellationToken);

	Task<ClientAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(ClientRefreshTokenRequestModel request, CancellationToken cancellationToken);
}
