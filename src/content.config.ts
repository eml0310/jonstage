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

export const collections = {performances, diary, summerTeams, summerDiaries, feature};
