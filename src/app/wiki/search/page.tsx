import { searchPages, getSearchablePages } from "@/lib/wiki/search";
import Link from "next/link";

export default async function WikiSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? searchPages(q) : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Search</h1>
      <p className="text-sm text-gray-500 mb-6">
        Use the search bar above or press ⌘K. {getSearchablePages().length} pages indexed.
      </p>
      <form className="mb-8">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </form>
      {q && (
        <ul className="space-y-4">
          {results.length === 0 ? (
            <li className="text-gray-500">No results for &ldquo;{q}&rdquo;</li>
          ) : (
            results.map((r) => (
              <li key={r.slug} className="border-b border-gray-100 pb-4">
                <Link
                  href={`/wiki/${r.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {r.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{r.excerpt}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
