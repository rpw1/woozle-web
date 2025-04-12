using Microsoft.Extensions.Options;
using Woozle.API.Spotify.Identity.Models.Client;
using Woozle.API.Spotify.Identity.Models.Spotify;

namespace Woozle.API.Spotify.Identity;

[ServiceRegistration(ServiceLifeTimeRegistrationType.Scoped)]
public sealed class SpotifyIdentityService : ISpotifyIdentityService
{
	private readonly ISpotifyIdentityApi _spotifyIdentityApi;
	private readonly SpotifySettings _spotifySettings;

	public SpotifyIdentityService(ISpotifyIdentityApi spotifyIdentityApi, 
		IOptions<SpotifySettings> spotifySettings)
	{
		_spotifyIdentityApi = spotifyIdentityApi ?? throw new ArgumentNullException(nameof(spotifyIdentityApi));
		_spotifySettings = spotifySettings.Value ?? throw new ArgumentNullException(nameof(spotifySettings));
	}

	public async Task<SpotifyAccessTokenResponseModel> RequestSpotifyAccessTokenAsync(ClientAccessTokenRequestModel request)
	{
		var spotifyRequestModel = new SpotifyAccessTokenRequestModel()
		{
			Code = request.Code,
			RedirectUri = request.RedirectUri
		};

		return await _spotifyIdentityApi.RequestAccessTokenAsync(_spotifySettings.ClientCredentialsAuthorization, spotifyRequestModel);
	}
}
