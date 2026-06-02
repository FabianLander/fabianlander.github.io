export const GRAPHICS_RANGE_TABS = [
  { slug: '2023-2025', label: '2023-25', start: 2023, end: 2025 },
  { slug: '2020-2022', label: '2020-22', start: 2020, end: 2022 },
  { slug: '2016-2019', label: '2016-19', start: 2016, end: 2019 },
] as const;

export type GraphicsRangeTab = (typeof GRAPHICS_RANGE_TABS)[number];

type EntryWithDate = {
  data: {
    date: Date | string;
  };
};

export function filterEntriesForGraphicsRange<T extends EntryWithDate>(
  entries: T[],
  range: GraphicsRangeTab,
): T[] {
  return entries.filter((entry) => {
    const year = new Date(entry.data.date).getFullYear();
    return year >= range.start && year <= range.end;
  });
}

export function getGraphicsRangeCounts<T extends EntryWithDate>(
  entries: T[],
): Record<string, number> {
  const counts = Object.fromEntries(GRAPHICS_RANGE_TABS.map((tab) => [tab.slug, 0])) as Record<string, number>;

  for (const entry of entries) {
    const year = new Date(entry.data.date).getFullYear();
    const tab = GRAPHICS_RANGE_TABS.find((r) => year >= r.start && year <= r.end);
    if (tab) counts[tab.slug] += 1;
  }

  return counts;
}
