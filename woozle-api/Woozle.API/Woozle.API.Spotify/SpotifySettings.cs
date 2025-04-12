using System.Text;

namespace Woozle.API.Spotify;

public sealed record class SpotifySettings(string ClientId, string ClientSecret, string AccountsBaseUrl)
{
    public string ClientCredentialsAuthorization => Convert.ToBase64String(Encoding.UTF8.GetBytes(ClientId + ":" + ClientSecret));
};
