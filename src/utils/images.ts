import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export type GlobResult = Record<string, { default: ImageMetadata }>;

/**
 * Auto-discover all images in a content entry's folder.
 *
 * Filters a pre-loaded import.meta.glob result to only images whose path
 * starts with the entry's directory. Returns optimized images, with the
 * cover image (if specified) first.
 */
export async function getEntryImages(
  entryId: string,
  collection: string,
  allImages: GlobResult,
  coverField?: string,
  width = 1200,
): Promise<{ src: string; width: number; height: number; filename: string }[]> {
  // entryId for content entries looks like "iceland-2024/index.md"
  const entryDir = entryId.endsWith('.md')
    ? entryId.replace(/\/[^/]+\.md$|[^/]+\.md$/, '')
    : entryId;

  const prefix = `/src/content/${collection}/${entryDir ? entryDir + '/' : ''}`;

  const entries = Object.entries(allImages).filter(([path]) => path.startsWith(prefix));

  const images = await Promise.all(
    entries.map(async ([path, mod]) => {
      const filename = path.split('/').pop()!;
      const optimized = await getImage({
        src: mod.default,
        width,
        format: 'webp',
        quality: 85,
      });
      return {
        src: optimized.src,
        width: mod.default.width,
        height: mod.default.height,
        filename,
      };
    }),
  );

  // Put cover image first if specified
  if (coverField) {
    const coverName = coverField.replace(/^\.\//, '');
    images.sort((a, b) => {
      if (a.filename === coverName) return -1;
      if (b.filename === coverName) return 1;
      return 0;
    });
  }

  return images;
}

/**
 * Find and optimize an image for a content collection entry.
 *
 * Resolves the entry's `image` frontmatter field against a pre-loaded
 * import.meta.glob result, trying folder-based and flat-file paths.
 * Returns an optimized image or null if the source isn't found.
 */
export async function resolveEntryImage(
  entryId: string,
  imageField: string,
  collection: string,
  allImages: GlobResult,
  width = 600,
): Promise<{ src: string; width: number; height: number } | null> {
  const filename = imageField.replace(/^\.\//, '');

  // Content entries: ID includes .md (e.g., "2026/my-piece/index.md").
  // Data entries: ID is the path without extension (e.g., "2024/hopf-fibration").
  // Extract the directory where the source file lives.
  const entryDir = entryId.endsWith('.md')
    ? entryId.replace(/\/[^/]+\.md$|[^/]+\.md$/, '')
    : entryId;

  // Folder-based entry first, then collection root for flat files
  const candidates = [
    ...(entryDir ? [`/src/content/${collection}/${entryDir}/${filename}`] : []),
    `/src/content/${collection}/${filename}`,
  ];

  let original: ImageMetadata | null = null;
  for (const path of candidates) {
    if (allImages[path]) {
      original = allImages[path].default;
      break;
    }
  }

  if (!original) {
    const entryPrefix = `/src/content/${collection}/${entryDir ? entryDir + '/' : ''}`;
    const inEntry = Object.entries(allImages).filter(([path]) => path.startsWith(entryPrefix));

    if (inEntry.length > 0) {
      const lower = filename.toLowerCase();
      const exactCaseInsensitive = inEntry.find(([path]) =>
        path.split('/').pop()!.toLowerCase() === lower,
      );
      if (exactCaseInsensitive) {
        original = exactCaseInsensitive[1].default;
      }
    }
  }

  if (!original) {
    const entryPrefix = `/src/content/${collection}/${entryDir ? entryDir + '/' : ''}`;
    const inEntry = Object.entries(allImages).filter(([path]) => path.startsWith(entryPrefix));

    if (inEntry.length > 0) {
      const normalizeBase = (name: string) =>
        name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]/g, '');
      const target = normalizeBase(filename);
      const normalizedMatch = inEntry.find(([path]) =>
        normalizeBase(path.split('/').pop()!) === target,
      );

      if (normalizedMatch) {
        original = normalizedMatch[1].default;
      } else {
        // Final fallback: avoid blank placeholders when image name drifts.
        original = inEntry
          .sort(([a], [b]) => a.localeCompare(b))[0][1]
          .default;
      }
    }
  }

  if (!original) return null;

  const optimized = await getImage({
    src: original,
    width,
    format: 'webp',
    quality: 85,
  });

  return {
    src: optimized.src,
    width: original.width,
    height: original.height,
  };
}
