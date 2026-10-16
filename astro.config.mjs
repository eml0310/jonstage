// @ts-check
import {defineConfig, passthroughImageService} from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://yoroweb.com',
    trailingSlash: 'always',
    image: {
        service: passthroughImageService()
    },
    integrations: [sitemap()]
});
