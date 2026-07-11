function normalize(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalize(explicit);

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;
  if (vercelUrl) return normalize(`https://${vercelUrl}`);

  return "https://briangelvez.vercel.app";
}

export const SITE_URL = resolveSiteUrl();
