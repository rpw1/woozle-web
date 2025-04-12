namespace Woozle.API.Spotify.Identity.Models.Client;

public class ClientAccessTokenRequestModel
{
	public required string Code { get; set; }

	public required string RedirectUri { get; set; }
}
