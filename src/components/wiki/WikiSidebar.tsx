import Link from "next/link";
import { BookOpen, Home, Search } from "lucide-react";
import { WikiTree } from "./WikiTree";
import type { WikiNavSection } from "@/lib/wiki/types";

export function WikiSidebar({
  sections,
  activeSlug,
}: {
  sections: WikiNavSection[];
  activeSlug: string;
}) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 p-3">
        <p className="px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Navigation
        </p>
        <div className="mt-1 space-y-0.5">
          <Link
            href="/wiki"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/wiki/search"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="/wiki/glossary"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <BookOpen className="h-4 w-4" />
            Glossary
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {section.title}
            </p>
            <WikiTree tree={section.nodes} activeSlug={activeSlug} />
          </div>
        ))}
      </div>
    </aside>
  );
}
