"use client";

import { BookOpen, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { WikiSearchResult } from "@/lib/wiki/types";

export function WikiHeader({ searchPages }: { searchPages: WikiSearchResult[] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = query.trim()
    ? searchPages.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
        );
      })
    : searchPages;

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4">
        <Link href="/wiki" className="flex items-center gap-2 shrink-0">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">Wiki</span>
        </Link>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50"
        >
          All Wiki
          <ChevronDown className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex flex-1 max-w-xl items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="truncate">Search Wiki...</span>
          <kbd className="ml-auto hidden sm:inline rounded border border-gray-200 bg-white px-1.5 text-xs">
            ⌘K
          </kbd>
        </button>
      </header>
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Wiki..."
                className="flex-1 text-sm outline-none"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-gray-500">
                  No results
                </li>
              ) : (
                filtered.slice(0, 12).map((p) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                        router.push(`/wiki/${p.slug}`);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        /wiki/{p.slug}
                      </p>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
