import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  WikiNavSection,
  WikiPage,
  WikiPageFrontmatter,
  WikiPageStatus,
  WikiRootMeta,
  WikiSpaceMeta,
  WikiTreeNode,
} from "./types";

const WIKI_ROOT = path.join(process.cwd(), "content", "wiki");

type FolderMeta = Record<string, { title?: string; order?: number }>;

function readFolderMeta(dir: string): FolderMeta {
  const metaPath = path.join(dir, "_meta.json");
  if (!fs.existsSync(metaPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8")) as FolderMeta;
  } catch {
    return {};
  }
}

export function readRootMeta(): WikiRootMeta {
  const metaPath = path.join(WIKI_ROOT, "_meta.json");
  if (!fs.existsSync(metaPath)) return {};
  try {
    const raw = JSON.parse(fs.readFileSync(metaPath, "utf-8")) as Record<
      string,
      unknown
    >;
    if (Array.isArray(raw.sections) && raw.spaces) {
      return raw as WikiRootMeta;
    }
    const spaces: Record<string, WikiSpaceMeta> = {};
    for (const [key, value] of Object.entries(raw)) {
      if (key.startsWith("_") || key === "sections") continue;
      spaces[key] = value as WikiSpaceMeta;
    }
    return { spaces };
  } catch {
    return {};
  }
}

function slugFromFile(relativePath: string): string {
  const withoutExt = relativePath.replace(/\.md$/, "");
  if (withoutExt.endsWith("/index")) {
    return withoutExt.slice(0, -"/index".length);
  }
  return withoutExt;
}

function titleFromSegment(segment: string): string {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseStatus(value: unknown): WikiPageStatus | undefined {
  if (value === "draft" || value === "stable" || value === "deprecated") {
    return value;
  }
  return undefined;
}

function pageFromFile(
  file: string,
  raw: string,
): WikiPage {
  const { data, content } = matter(raw);
  const fm = data as WikiPageFrontmatter;
  const slug = slugFromFile(file);
  const segment = slug.split("/").pop() ?? slug;

  return {
    slug,
    title: fm.title ?? titleFromSegment(segment),
    summary: fm.summary,
    owner: fm.owner,
    updated: fm.updated,
    reviewBy: fm.review_by,
    status: parseStatus(fm.status) ?? "stable",
    order: fm.order ?? 999,
    content: content.trim(),
  };
}

function collectMarkdownFiles(dir: string, prefix = ""): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".md")) {
      files.push(rel);
    }
  }

  return files;
}

export function getAllPages(): WikiPage[] {
  if (!fs.existsSync(WIKI_ROOT)) return [];

  const files = collectMarkdownFiles(WIKI_ROOT);
  const pages: WikiPage[] = [];

  for (const file of files) {
    const fullPath = path.join(WIKI_ROOT, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    pages.push(pageFromFile(file, raw));
  }

  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getPageBySlug(slugParts: string[]): WikiPage | null {
  const slug = slugParts.join("/");
  const candidates = [`${slug}.md`, `${slug}/index.md`];

  for (const candidate of candidates) {
    const fullPath = path.join(WIKI_ROOT, candidate);
    if (!fs.existsSync(fullPath)) continue;
    const raw = fs.readFileSync(fullPath, "utf-8");
    return pageFromFile(candidate, raw);
  }

  return null;
}

function getOrCreateFolder(
  parent: WikiTreeNode[],
  segment: string,
  slug: string,
  title: string,
  order: number,
): WikiTreeNode {
  let node = parent.find((n) => n.segment === segment && n.type === "folder");
  if (!node) {
    node = {
      segment,
      slug,
      title,
      type: "folder",
      order,
      children: [],
    };
    parent.push(node);
  }
  return node;
}

export function getPageTree(): WikiTreeNode[] {
  const pages = getAllPages();
  const root: WikiTreeNode[] = [];
  const folderMetaCache = new Map<string, FolderMeta>();
  const rootMeta = readRootMeta();
  const spaces = rootMeta.spaces ?? {};

  function metaForDir(relativeDir: string): FolderMeta {
    if (!folderMetaCache.has(relativeDir)) {
      const abs = relativeDir ? path.join(WIKI_ROOT, relativeDir) : WIKI_ROOT;
      folderMetaCache.set(relativeDir, readFolderMeta(abs));
    }
    return folderMetaCache.get(relativeDir)!;
  }

  for (const page of pages) {
    if (page.slug === "index") continue;

    const parts = page.slug.split("/");
    let current = root;
    let pathSoFar = "";

    for (let i = 0; i < parts.length - 1; i++) {
      const segment = parts[i];
      pathSoFar = pathSoFar ? `${pathSoFar}/${segment}` : segment;
      const dirMeta = metaForDir(i === 0 ? "" : parts.slice(0, i).join("/"));
      const entry = dirMeta[segment];
      const spaceOrder = spaces[segment]?.order;
      const folder = getOrCreateFolder(
        current,
        segment,
        pathSoFar,
        spaces[segment]?.title ?? entry?.title ?? titleFromSegment(segment),
        spaceOrder ?? entry?.order ?? 999,
      );
      current = folder.children;
    }

    const leaf = parts[parts.length - 1];
    current.push({
      segment: leaf,
      slug: page.slug,
      title: page.title,
      type: "page",
      order: page.order,
      children: [],
    });
  }

  function sortNodes(nodes: WikiTreeNode[]): WikiTreeNode[] {
    return nodes
      .map((n) => ({ ...n, children: sortNodes(n.children) }))
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.title.localeCompare(b.title);
      });
  }

  return sortNodes(root);
}

function spaceKeyForNode(node: WikiTreeNode): string {
  if (node.type === "folder") return node.slug.split("/")[0];
  return node.slug.includes("/") ? node.slug.split("/")[0] : node.slug;
}

export function getWikiNavSections(): WikiNavSection[] {
  const tree = getPageTree();
  const rootMeta = readRootMeta();
  const spaces = rootMeta.spaces ?? {};

  if (!rootMeta.sections?.length) {
    return [{ id: "all", title: "Pages", order: 0, nodes: tree }];
  }

  const sections = [...rootMeta.sections].sort((a, b) => a.order - b.order);
  const assigned = new Set<string>();

  const result: WikiNavSection[] = sections.map((section) => {
    const nodes = tree.filter((node) => {
      const key = spaceKeyForNode(node);
      const space = spaces[key];
      if (space?.section !== section.id) return false;
      assigned.add(node.slug);
      return true;
    });
    return { ...section, nodes };
  });

  const unassigned = tree.filter((n) => !assigned.has(n.slug));
  if (unassigned.length > 0) {
    result.push({
      id: "other",
      title: "Other",
      order: 999,
      nodes: unassigned,
    });
  }

  return result.filter((s) => s.nodes.length > 0);
}

export function formatUpdated(dateStr?: string): string {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
