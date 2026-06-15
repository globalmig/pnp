declare global {
  // eslint-disable-next-line no-var
  var __cf_platform_proxy: { env: CloudflareEnv } | undefined;
}

export async function getEnv(): Promise<CloudflareEnv> {
  if (process.env.NODE_ENV !== "production") {
    if (!globalThis.__cf_platform_proxy) {
      const { getPlatformProxy } = await import(/* webpackIgnore: true */ "wrangler");
      const proxy = await getPlatformProxy<CloudflareEnv>({
        persist: { path: ".wrangler/state/v3" },
      });
      globalThis.__cf_platform_proxy = proxy;
    }
    return globalThis.__cf_platform_proxy!.env;
  }
  const { getCloudflareContext } = await import(/* webpackIgnore: true */ "@opennextjs/cloudflare");
  const { env } = await getCloudflareContext({ async: true });
  return env as CloudflareEnv;
}
