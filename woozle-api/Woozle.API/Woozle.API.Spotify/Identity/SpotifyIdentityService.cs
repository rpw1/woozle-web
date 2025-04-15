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

	public async Task<ClientAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(ClientAccessTokenRequestModel request, CancellationToken cancellationToken)
	{
		var spotifyRequestModel = new SpotifyAccessTokenRequestModel()
		{
			Code = request.Code,
			RedirectUri = request.RedirectUri
		};

		var response = await _spotifyIdentityApi.RequestAccessTokenAsync(_spotifySettings.ClientCredentialsAuthorization, spotifyRequestModel, cancellationToken);

		if (response?.Content is null)
		{
			return null;
		}

		return new ClientAccessTokenResponseModel()
		{
			AccessToken = response.Content.AccessToken,
			ExpiresIn = response.Content.ExpiresIn,
			RefreshToken = response.Content.RefreshToken,
			Scope = response.Content.Scope,
			TokenType = response.Content.TokenType
		};
	}

	public async Task<ClientAccessTokenResponseModel?> RequestSpotifyAccessTokenAsync(ClientRefreshTokenRequestModel request, CancellationToken cancellationToken)
	{
		var spotifyRequestModel = new SpotifyRefreshTokenRequestModel()
		{
			RefreshToken = request.RefreshToken
		};

		var response = await _spotifyIdentityApi.RefreshTokenAsync(_spotifySettings.ClientCredentialsAuthorization, spotifyRequestModel, cancellationToken);

		if (response?.Content is null)
		{
			return null;
		}

		return new ClientAccessTokenResponseModel()
		{
			AccessToken = response.Content.AccessToken,
			ExpiresIn = response.Content.ExpiresIn,
			RefreshToken = response.Content.RefreshToken,
			Scope = response.Content.Scope,
			TokenType = response.Content.TokenType
		};
	}
}
