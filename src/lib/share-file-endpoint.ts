import {lstat, readFile} from 'node:fs/promises';
import {dirname, extname, resolve} from 'node:path';
import type {APIRoute, GetStaticPaths} from 'astro';
import {getShares, sharedFiles} from './share';

export const getStaticPaths = (async ({routePattern}) => {
    const extension = extname(routePattern);
    const entries = await getShares();
    return entries.flatMap((entry) => {
        if (!entry.filePath) throw new Error('共有ページの Markdown が見つかりません');
        const directory = dirname(entry.filePath);
        return sharedFiles(entry).filter((file) => file.extension === extension).map((file) => ({
            params: {id: entry.data.shareId, asset: file.basename},
            props: {path: resolve(directory, file.file), type: file.inlineType},
        }));
    });
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({props}) => {
    const {path, type} = props as {path: string, type?: string};
    if (!(await lstat(path)).isFile()) {
        throw new Error(`配布ファイルには通常のファイルを指定してください: ${path}`);
    }
    return new Response(await readFile(path), {
        headers: {
            'Content-Type': type ?? 'application/octet-stream',
            'X-Robots-Tag': 'noindex',
        },
    });
};
