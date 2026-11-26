import {defineCollection} from 'astro:content';
import {z} from 'astro/zod';
import {glob} from 'astro/loaders';

const feature = defineCollection({
    loader: glob({pattern: '**/index.md', base: './contents/feature'}),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        thumbnail: image().optional(),
        video: z.object({
            src: z.string(),
            width: z.number().int().positive(),
            height: z.number().int().positive(),
            type: z.string(),
        }).optional(),
    }),
});

const performances = defineCollection({
    loader: glob({pattern: '**/index.md', base: './contents/performances'}),
    schema: ({image}) => z.object({
        name: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),
        category: z.string().optional(),
        venue: z.object({
            name: z.string(),
            address: z.string().optional(),
        }).optional(),
        playwright: z.string().optional(),
        director: z.string().optional(),
        excerpt: z.string().optional(),
        flyer: z.object({
            front: image(),
            back: image().optional(),
        }).optional(),
        thumbnail: image().optional(),
        offers: z.array(
            z.object({
                label: z.string(),
                price: z.number(),
            })
        ).optional(),
        overview: z.boolean().optional().default(false),
        noindex: z.boolean().optional().default(false),
    }),
});

const diary = defineCollection({
    loader: glob({pattern: '**/index.md', base: './contents/diary'}),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        event_name: z.string().optional(),
    }),
});

const summerTeams = defineCollection({
    loader: glob({
        base: "./contents/summer",
        pattern: "*/*/index.md",
    }),
    schema: ({image}) => z.object({
        name: z.string(),
        year: z.number(),
        director: z.string().optional(),
        twitter: z.url().optional(),
        instagram: z.url().optional(),
        thumbnail: image().optional(),
    }),
});

const summerDiaries = defineCollection({
    loader: glob({
        base: "./contents/summer",
        pattern: "*/*/*/index.md",
    }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
    }),
});

const share = defineCollection({
    loader: glob({pattern: '[0-9][0-9][0-9][0-9]/*/index.md', base: './contents/share'}),
    schema: z.object({
        shareId: z.string().regex(/^[a-f0-9]{16}([a-f0-9]{16})?$/),
        title: z.string().min(1),
        files: z.array(z.object({
            file: z.string().min(1).regex(/^[^/\\:*?"<>|\x00-\x1f]+$/).refine(
                (name) => !name.startsWith('.')
            ),
            label: z.string().min(1),
            alt: z.string().optional(),
        })).min(1),
    }),
});

export const collections = {performances, diary, summerTeams, summerDiaries, feature, share};
