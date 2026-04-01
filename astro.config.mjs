// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  /*
  si pongo el output en server todo se renderiza del lado del servidor por defecto y para que algo se genere estatico necesito
  export const prerender = true;

  si pongo el output en static todo se renderiza del lado del cliente por defecto y para que algo se genere del lado del servidor necesito
  export const prerender = false;
  */
  adapter: node({
    mode: 'standalone',
  }),
});