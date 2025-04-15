namespace Woozle.API.Features.Identity.Spotify.Models;

public class ClientAccessTokenRequestModel
{
	public required string Code { get; set; }

	public required string RedirectUri { get; set; }
}
