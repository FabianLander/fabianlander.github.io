import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { GlobResult } from './images';

export type GraphicsEntry = CollectionEntry<'graphics'> & {
  coverMeta: ImageMetadata | null;
  extraMetas: ImageMetadata[];
  imageCount: number;
};

function getEntryFolderImages(
  entryId: string,
  imageField: string,
  graphicsImages: GlobResult,
): { coverMeta: ImageMetadata | null; allMetas: ImageMetadata[]; } {
  const entryDir = entryId.endsWith('.md')
    ? entryId.replace(/\/[^/]+\.md$|[^/]+\.md$/, '')
    : entryId;

  const entryPrefix = `/src/content/graphics/${entryDir ? entryDir + '/' : ''}`;

  const allInFolder = Object.entries(graphicsImages)
    .filter(([path]) => path.startsWith(entryPrefix))
    .map(([path, mod]) => ({
      filename: path.split('/').pop()!,
      meta: mod.default,
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename));

  if (allInFolder.length === 0) {
    return { coverMeta: null, allMetas: [] };
  }

  const wanted = imageField.replace(/^\.\//, '');
  const wantedLower = wanted.toLowerCase();

  let coverIndex = allInFolder.findIndex((img) => img.filename === wanted);
  if (coverIndex < 0) {
    coverIndex = allInFolder.findIndex((img) => img.filename.toLowerCase() === wantedLower);
  }
  if (coverIndex < 0) coverIndex = 0;

  // Put cover first
  const ordered = [...allInFolder];
  if (coverIndex > 0) {
    const [cover] = ordered.splice(coverIndex, 1);
    ordered.unshift(cover);
  }

  return {
    coverMeta: ordered[0].meta,
    allMetas: ordered.map((img) => img.meta),
  };
}

export function buildGraphicsEntries(
  entries: CollectionEntry<'graphics'>[],
  graphicsImages: GlobResult,
): GraphicsEntry[] {
  return entries.map((entry) => {
    const { coverMeta, allMetas } = getEntryFolderImages(entry.id, entry.data.image, graphicsImages);

    return {
      ...entry,
      coverMeta,
      extraMetas: allMetas.slice(1, 4),
      imageCount: allMetas.length,
    };
  });
}

export function getAllEntryMetas(
  entry: CollectionEntry<'graphics'>,
  graphicsImages: GlobResult,
): ImageMetadata[] {
  const { allMetas } = getEntryFolderImages(entry.id, entry.data.image, graphicsImages);
  return allMetas;
}

export function groupGraphicsByYear(entries: GraphicsEntry[]) {
  const byYear = new Map<number, GraphicsEntry[]>();

  for (const entry of entries) {
    const year = entry.data.date.getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(entry);
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);

  for (const yearEntries of byYear.values()) {
    yearEntries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  }

  return { byYear, years };
}

export function getGraphicsSubjects(entries: GraphicsEntry[]) {
  return [...new Set(entries.flatMap((entry) => entry.data.subject))].sort();
}
