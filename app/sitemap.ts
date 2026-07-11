import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  const sections = NAV_ITEMS.filter((item) => item.href !== "#hero").map(
    (item) => ({
      url: `${SITE_URL}/${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [home, ...sections];
}
