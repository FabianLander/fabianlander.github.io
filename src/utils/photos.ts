import { getCollection } from 'astro:content';
import { getEntryImages, type GlobResult } from './images';

export type PhotoItem =
  | { type: 'header'; title: string; date: string }
  | {
      type: 'photo';
      thumbnail: string;
      fullSize: string;
      width: number;
      height: number;
      globalIndex: number;
      tripTitle: string;
    };

export type LightboxEntry = {
  fullSize: string;
  tripTitle: string;
  date: string;
};

/** Collect all trips sorted by date descending. */
export async function getAllTrips() {
  const trips = await getCollection('photos');
  return trips.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** Compute year counts and tag counts across all trips. */
export function getNavData(trips: Awaited<ReturnType<typeof getAllTrips>>) {
  const yearCounts: Record<number, number> = {};
  const tagCounts: Record<string, number> = {};

  for (const trip of trips) {
    const year = Number(trip.data.date.slice(0, 4));
    yearCounts[year] = (yearCounts[year] || 0) + 1;
    for (const tag of trip.data.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const years = Object.keys(yearCounts).map(Number).sort((a, b) => b - a);
  const tags = Object.keys(tagCounts).sort();

  return { years, yearCounts, tags, tagCounts };
}

/**
 * Build a flat gallery items array (interleaved headers + photos)
 * and a lightbox data array from a subset of trips.
 */
export async function buildGallery(
  trips: Awaited<ReturnType<typeof getAllTrips>>,
  allImages: GlobResult,
) {
  const galleryItems: PhotoItem[] = [];
  const lightboxData: LightboxEntry[] = [];
  let globalIndex = 0;

  for (const trip of trips) {
    galleryItems.push({
      type: 'header',
      title: trip.data.title,
      date: trip.data.date,
    });

    const thumbs = await getEntryImages(trip.id, 'photos', allImages, trip.data.cover, 800);
    const fulls = await getEntryImages(trip.id, 'photos', allImages, trip.data.cover, 1400);

    for (let i = 0; i < thumbs.length; i++) {
      const fullSize = fulls[i]?.src ?? thumbs[i].src;

      galleryItems.push({
        type: 'photo',
        thumbnail: thumbs[i].src,
        fullSize,
        width: thumbs[i].width,
        height: thumbs[i].height,
        globalIndex,
        tripTitle: trip.data.title,
      });

      lightboxData.push({
        fullSize,
        tripTitle: trip.data.title,
        date: trip.data.date,
      });

      globalIndex++;
    }
  }

  return { galleryItems, lightboxData };
}

/** Format YYYY-MM to readable string. */
export function formatDate(ym: string): string {
  const [year, month] = ym.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
