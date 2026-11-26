import {createHash} from 'node:crypto';
import {extname} from 'node:path';
import {getCollection, type CollectionEntry} from 'astro:content';

import {imageTypes} from './share-file-types.mjs';

export async function getShares() {
    const entries = await getCollection('share');
    const ids = new Set<string>();
    for (const entry of entries) {
        if (ids.has(entry.data.shareId)) {
            throw new Error(`共有IDが重複しています: ${entry.filePath}`);
        }
        ids.add(entry.data.shareId);
    }
    return entries;
}

export function sharedFiles(entry: CollectionEntry<'share'>) {
    const names = new Set<string>();
    return entry.data.files.map((file) => {
        if (names.has(file.file) || file.file === 'index.md') {
            throw new Error(`配布ファイルの指定を確認してください: ${entry.filePath} (${file.file})`);
        }
        names.add(file.file);
        const extension = extname(file.file).toLowerCase();
        const imageType = imageTypes[extension as keyof typeof imageTypes];
        const inlineType = imageType ?? (extension === '.pdf' ? 'application/pdf' : undefined);
        const basename = createHash('sha256').update(file.file).digest('hex').slice(0, 32);
        const servedExtension = inlineType ? extension : '.download';
        const asset = basename + servedExtension;
        return {
            ...file,
            basename,
            extension: servedExtension,
            url: `/share/${entry.data.shareId}/files/${asset}`,
            image: Boolean(imageType),
            inlineType,
        };
    });
}
