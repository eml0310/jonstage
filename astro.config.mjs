// @ts-check
import {defineConfig, passthroughImageService} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {shareFileExtensions} from './src/lib/share-file-types.mjs';

/** @type {import('astro').AstroIntegration} */
const shareFiles = {
    name: 'share-files',
    hooks: {
        'astro:config:setup': ({injectRoute}) => {
            // Literal extensions let Astro match these file URLs without a trailing slash.
            for (const extension of shareFileExtensions) {
                injectRoute({
                    pattern: `/share/[id]/files/[asset]${extension}`,
                    entrypoint: './src/lib/share-file-endpoint.ts',
                });
            }
        },
    },
};

// https://astro.build/config
export default defineConfig({
    site: 'https://yoroweb.com',
    trailingSlash: 'always',
    image: {
        service: passthroughImageService()
    },
    integrations: [shareFiles, sitemap({filter: (url) => !new URL(url).pathname.startsWith('/share/')})]
});
