import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://nunncorporation.com',
  integrations: [preact(), sitemap({
    customPages: [
      'https://nunncorporation.com/',
      'https://nunncorporation.com/deploy-previews',
      'https://nunncorporation.com/instant-rollbacks',
      'https://nunncorporation.com/functions',
      'https://nunncorporation.com/netlify-forms',
    ]
  })],
  output: "server",
  adapter: cloudflare()
});