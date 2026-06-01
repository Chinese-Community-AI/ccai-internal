import { getWikiNavSections } from "@/lib/wiki/content";
import { getSearchablePages } from "@/lib/wiki/search";
import { WikiLayoutClient } from "@/components/wiki/WikiLayoutClient";

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getWikiNavSections();
  const searchPages = getSearchablePages();

  return (
    <WikiLayoutClient sections={sections} searchPages={searchPages}>
      {children}
    </WikiLayoutClient>
  );
}
