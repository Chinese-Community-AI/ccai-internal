export type WikiPageStatus = "draft" | "stable" | "deprecated";

export interface WikiPageFrontmatter {
  title?: string;
  summary?: string;
  owner?: string;
  updated?: string;
  review_by?: string;
  status?: WikiPageStatus;
  order?: number;
}

export interface WikiPage {
  slug: string;
  title: string;
  summary?: string;
  owner?: string;
  updated?: string;
  reviewBy?: string;
  status?: WikiPageStatus;
  order: number;
  content: string;
}

export interface WikiTreeNode {
  segment: string;
  slug: string;
  title: string;
  type: "folder" | "page";
  order: number;
  children: WikiTreeNode[];
}

export interface WikiNavSection {
  id: string;
  title: string;
  order: number;
  nodes: WikiTreeNode[];
}

export interface WikiSearchResult {
  slug: string;
  title: string;
  excerpt: string;
}

export interface WikiSpaceMeta {
  title?: string;
  order?: number;
  section?: string;
}

export interface WikiRootMeta {
  sections?: { id: string; title: string; order: number }[];
  spaces?: Record<string, WikiSpaceMeta>;
}
