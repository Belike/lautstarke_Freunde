import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The book content lives DELIBERATELY outside the code, in the folder
// `../book-content` (relative to the project root `code/`). This keeps the
// editorial content separate from the technical code: Norma/editorial maintain
// the Markdown files there, the website pulls them in automatically.
const books = defineCollection({
  // Exclude README.md etc. — only load real book markdown files.
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: '../book-content' }),
  schema: z.object({
    title: z.string(),
    character: z.string(), // e.g. "Fanni Fuchs"
    sound: z.string(), // target sound, e.g. "/f/"
    subtitle: z.string().optional(),
    // Accent color of the character (CSS value), e.g. "#7c4daa" for Fanni Fuchs.
    accentColor: z.string().optional(),
    coverImage: z.string().optional(), // path relative to ../graphics
    ageRecommendation: z.string().optional(),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
  }),
});

export const collections = { books };
