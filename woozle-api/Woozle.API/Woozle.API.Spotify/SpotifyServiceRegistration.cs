using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using Woozle.API.Common.Extensions;
using Woozle.API.Spotify.Identity;

namespace Woozle.API.Spotify;

public static class SpotifyServiceRegistration
{
	public static IServiceCollection RegisterSpotifyServices(this IServiceCollection services, IConfiguration configuration)
	{
		services.Configure<SpotifySettings>(configuration.GetSection(nameof(SpotifySettings)));

		services.RegisterDecoratedServices();

		services.AddRefitClient<ISpotifyIdentityApi>()
			.ConfigureHttpClient(client => 
			{
				var spotifySettings = configuration.GetValue<SpotifySettings>(nameof(SpotifySettings));
				ArgumentNullException.ThrowIfNull(spotifySettings);

                client.BaseAddress = new Uri(spotifySettings.AccountsBaseUrl);
			});

		return services;
	}
}
