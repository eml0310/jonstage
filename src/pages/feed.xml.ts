import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function createDescription(body: string | undefined, title: string, date: Date, maxLength = 160): string {
    if (!body || typeof body !== 'string') {
        return `${dateFormatter.format(date)}に公開された劇団万絵巻の劇団員日記「${title}」です。`;
    }
    const plainText = body
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/[#*`_~>]/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (plainText.length < 20) {
        return `${dateFormatter.format(date)}に公開された劇団万絵巻の劇団員日記「${title}」です。`;
    }

    return plainText.length > maxLength
        ? `${plainText.slice(0, maxLength)}…`
        : plainText;
}

export const GET: APIRoute = async (context) => {
    const diaryEntries = await getCollection('diary');
    const featureEntries = await getCollection('feature');

    const diaryItems = diaryEntries.map((entry) => {
        const slug = entry.data.date.toISOString().split('T')[0];
        return {
            title: entry.data.title,
            pubDate: entry.data.date,
            description: createDescription(entry.body, entry.data.title, entry.data.date),
            link: `/diary/${slug}/`,
            categories: entry.data.event_name ? ['劇団員日記', entry.data.event_name] : ['劇団員日記'],
        };
    });

    const featureItems = featureEntries.map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.description,
        link: `/feature/${entry.id}/`,
        categories: ['特集'],
    }));

    const items = [...diaryItems, ...featureItems].sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    );

    return rss({
        title: '劇団万絵巻',
        description: '関西大学高槻キャンパスで活動している学生劇団で、1994年以来ダンスコメディを始めなんでもありのエンターテイメントを追求しています。',
        site: context.site!,
        items,
        customData: '<language>ja</language>',
    });
};
