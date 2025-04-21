using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Woozle.API.Common;
using Woozle.API.Common.Extensions;

namespace Woozle.API.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public sealed class SpotifyAuthorizationAttribute : Attribute, IAuthorizationFilter
{
	public void OnAuthorization(AuthorizationFilterContext context)
	{
		var spotifyToken = context.HttpContext.Request.Headers[Constants.Authorization];
		if (spotifyToken.SingleOrDefault().IsNullOrEmpty())
		{
			context.Result = new BadRequestResult();
		}
	}
}
