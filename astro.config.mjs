import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://nunncorporation.com',
  integrations: [preact(), sitemap({
    canonicalURL: 'https://nunncorporation.com'
  })],
  output: "server",
  adapter: cloudflare()
});