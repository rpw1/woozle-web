using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Woozle.API.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public sealed class SpotifyAuthorizationAttribute : Attribute, IAuthorizationFilter
{
	public void OnAuthorization(AuthorizationFilterContext context)
	{
		var spotifyToken = context.HttpContext.Request.Headers["Spotify-Authorization"];
		if (string.IsNullOrEmpty(spotifyToken))
		{
			context.Result = new BadRequestResult();
		}
	}
}
