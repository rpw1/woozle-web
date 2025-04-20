using Refit;

namespace Woozle.API.Spotify.Identity.Api;

public interface ISpotifyIdentityApi
{
	[Post("/api/token")]
	[Headers("Content-Type: application/x-www-form-urlencoded")]
	Task<IApiResponse<SpotifyAccessTokenResponseModel>> RequestAccessTokenAsync(
		[Header("Authorization")] string accessToken,
		[Body(BodySerializationMethod.UrlEncoded)] SpotifyAccessTokenRequestModel request,
		CancellationToken cancellationToken);

	[Post("/api/token")]
	[Headers("Content-Type: application/x-www-form-urlencoded")]
	Task<IApiResponse<SpotifyAccessTokenResponseModel>> RefreshTokenAsync(
		[Header("Authorization")] string accessToken,
		[Body(BodySerializationMethod.UrlEncoded)] SpotifyRefreshTokenRequestModel request,
		CancellationToken cancellationToken);
}
