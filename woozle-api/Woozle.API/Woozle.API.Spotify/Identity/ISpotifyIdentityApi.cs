using Refit;
using Woozle.API.Spotify.Identity.Models.Spotify;

namespace Woozle.API.Spotify.Identity;

public interface ISpotifyIdentityApi
{
	[Post("api/token")]
	Task<SpotifyAccessTokenResponseModel> RequestAccessTokenAsync(
		[Header("Authorization")] string accessToken,
		[Body(BodySerializationMethod.UrlEncoded)] SpotifyAccessTokenRequestModel request,
		[Header("Content-Type")] string contentType = "application/x-www-form-urlencoded");

	[Post("/api/token")]
	Task<SpotifyAccessTokenResponseModel> RefreshTokenAsync(
		[Header("Authorization")] byte[] accessToken,
		[Body(BodySerializationMethod.UrlEncoded)] SpotifyRefreshTokenRequestModel request,
		[Header("Content-Type")] string contentType = "application/x-www-form-urlencoded");
}
