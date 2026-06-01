import { formatUpdated } from "@/lib/wiki/content";
import type { WikiPageStatus } from "@/lib/wiki/types";

const statusStyles: Record<
  WikiPageStatus,
  { label: string; className: string }
> = {
  stable: { label: "Stable", className: "bg-green-50 text-green-800" },
  draft: { label: "Draft", className: "bg-amber-50 text-amber-800" },
  deprecated: { label: "Deprecated", className: "bg-gray-100 text-gray-600" },
};

export function PageMetadataBar({
  title,
  summary,
  updated,
  owner,
  reviewBy,
  status = "stable",
}: {
  title: string;
  summary?: string;
  updated?: string;
  owner?: string;
  reviewBy?: string;
  status?: WikiPageStatus;
}) {
  const statusBadge = statusStyles[status];

  return (
    <header className="border-b border-gray-200 pb-4 mb-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
      {summary && (
        <p className="text-base text-gray-600 mb-3 leading-relaxed">{summary}</p>
      )}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span>Last updated {formatUpdated(updated)}</span>
        {reviewBy && <span>· Review by {formatUpdated(reviewBy)}</span>}
        {owner && (
          <span
            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700"
            title="Page owner"
          >
            {owner}
          </span>
        )}
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.className}`}
        >
          {statusBadge.label}
        </span>
        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          Read-only
        </span>
      </div>
    </header>
  );
}
