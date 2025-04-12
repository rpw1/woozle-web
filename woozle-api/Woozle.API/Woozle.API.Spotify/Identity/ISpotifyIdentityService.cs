using Woozle.API.Spotify.Identity.Models.Client;
using Woozle.API.Spotify.Identity.Models.Spotify;

namespace Woozle.API.Spotify.Identity;

public interface ISpotifyIdentityService
{
    Task<SpotifyAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(ClientAccessTokenRequestModel request, CancellationToken cancellationToken);
}
