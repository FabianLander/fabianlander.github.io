import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ===== Shared schema fragments ===== */

const venue = z.object({
  name: z.string(),
  date: z.coerce.date(),
  url: z.string().optional(),
});

const optionalStr = z.string().nullable().optional().transform((v) => v ?? undefined);

/* ===== Data collections (YAML) ===== */

const papers = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    venue: z.string(),
    venueUrl: z.string().optional(),
    status: z.enum(['published', 'preprint']),
    date: z.coerce.date(),
    url: z.string().optional(),
    arxiv: z.string().optional(),
    abstract: z.string().optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['textbook', 'course-notes', 'expository']),
    description: z.string(),
    url: z.string().optional(),
    date: z.coerce.date().optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    collaborators: z.array(z.string()).default([]),
  }),
});

/* ===== Content collections (markdown body, colocated assets) ===== */

const graphics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/graphics' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    technique: z.string().optional(),
    image: z.string(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    collaborators: z.array(z.string()).default([]),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/software' }),
  schema: z.object({
    title: z.string(),
    description: optionalStr,
    tech: optionalStr,
    github: z.string().optional(),
    license: z.string().optional(),
    status: z.enum(['active', 'archived']).optional(),
    seeAlso: z.object({ label: z.string(), url: z.string() }).optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    collaborators: z.array(z.string()).default([]),
  }),
});

const demos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/demos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: optionalStr,
    technique: optionalStr,
    url: z.string(),
    image: optionalStr,
    order: z.number().optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    collaborators: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    collaborators: z.array(z.string()).default([]),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/photos' }),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM format'),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    venues: z.array(venue).default([]),
    abstract: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
    subject: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const food = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/food' }),
  schema: z.object({}),
});

const now = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/now' }),
  schema: z.object({
    updated: z.coerce.date(),
  }),
});

export const collections = {
  papers,
  demos,
  writing,
  graphics,
  software,
  blog,
  talks,
  photos,
  food,
  now,
};
