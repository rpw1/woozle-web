using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Woozle.API.Spotify.Identity.Models;

namespace Woozle.API.Spotify.Content;

public interface ISpotifyContentApi
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
