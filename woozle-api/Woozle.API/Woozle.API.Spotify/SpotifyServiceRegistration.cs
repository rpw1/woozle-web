using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using Woozle.API.Common.Extensions;
using Woozle.API.Spotify.Identity.Api;

namespace Woozle.API.Spotify;

public static class SpotifyServiceRegistration
{
	public static IServiceCollection RegisterSpotifyServices(this IServiceCollection services, IConfiguration configuration)
	{
		services.Configure<SpotifySettings>(configuration.GetSection(nameof(SpotifySettings)));

		services.AddRefitClient<ISpotifyIdentityApi>()
			.ConfigureHttpClient(client => 
			{
				var spotifySettings = configuration.GetSection(nameof(SpotifySettings)).Get<SpotifySettings>();
				ArgumentException.ThrowIfNullOrEmpty(spotifySettings?.AccountsBaseUrl);

                client.BaseAddress = new Uri(spotifySettings.AccountsBaseUrl);
			});

		services.RegisterDecoratedServices();

		return services;
	}
}
