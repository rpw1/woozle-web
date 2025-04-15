using Woozle.API.Features.Identity.Spotify.Models;

namespace Woozle.API.Features.Identity.Spotify;

public interface ISpotifyIdentityService
{
	Task<ClientAccessTokenResponseModel?> RequestAccessTokenAsync(ClientAccessTokenRequestModel request, CancellationToken cancellationToken);

	Task<ClientAccessTokenResponseModel?> RequestAccessTokenAsync(ClientRefreshTokenRequestModel request, CancellationToken cancellationToken);
}
