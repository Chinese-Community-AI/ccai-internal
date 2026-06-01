import { Index } from "flexsearch";
import { getAllPages } from "./content";
import type { WikiSearchResult } from "./types";

let cachedIndex: Index | null = null;
let cachedPages: WikiSearchResult[] = [];

function buildExcerpt(page: {
  summary?: string;
  content: string;
}): string {
  if (page.summary?.trim()) return page.summary.trim();
  const plain = page.content
    .replace(/[#>*`\[\]()!|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 120) return plain;
  return `${plain.slice(0, 120)}…`;
}

function getIndex(): { index: Index; pages: WikiSearchResult[] } {
  if (cachedIndex) return { index: cachedIndex, pages: cachedPages };

  const allPages = getAllPages().filter((p) => p.slug !== "index");
  cachedPages = allPages.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: buildExcerpt(p),
  }));

  const index = new Index({ tokenize: "forward", cache: true });
  cachedPages.forEach((p, i) => {
    const page = allPages[i];
    index.add(
      i,
      `${p.title} ${page.summary ?? ""} ${p.excerpt}`,
    );
  });
  cachedIndex = index;
  return { index, pages: cachedPages };
}

export function searchPages(query: string, limit = 20): WikiSearchResult[] {
  const q = query.trim();
  if (!q) return [];
  const { index, pages } = getIndex();
  const results = index.search(q, { limit }) as number[];
  return results.map((i) => pages[i]).filter(Boolean);
}

export function getSearchablePages(): WikiSearchResult[] {
  return getIndex().pages;
}
