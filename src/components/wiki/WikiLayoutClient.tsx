"use client";

import { usePathname } from "next/navigation";
import { WikiHeader } from "./WikiHeader";
import { WikiSidebar } from "./WikiSidebar";
import type { WikiNavSection, WikiSearchResult } from "@/lib/wiki/types";

export function WikiLayoutClient({
  children,
  sections,
  searchPages,
}: {
  children: React.ReactNode;
  sections: WikiNavSection[];
  searchPages: WikiSearchResult[];
}) {
  const pathname = usePathname();
  let activeSlug = "";
  if (pathname.startsWith("/wiki/")) {
    activeSlug = pathname.replace(/^\/wiki\/?/, "") || "index";
  } else if (pathname === "/wiki") {
    activeSlug = "index";
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      <WikiHeader searchPages={searchPages} />
      <div className="flex min-h-0 flex-1">
        <WikiSidebar sections={sections} activeSlug={activeSlug} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
