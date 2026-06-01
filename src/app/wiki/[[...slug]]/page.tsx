import { getPageBySlug } from "@/lib/wiki/content";
import { PageMetadataBar } from "@/components/wiki/PageMetadataBar";
import { MarkdownRenderer } from "@/components/wiki/MarkdownRenderer";
import { notFound } from "next/navigation";

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugParts = slug ?? [];
  const resolved =
    slugParts.length === 0
      ? (getPageBySlug(["index"]) ?? getPageBySlug([]))
      : getPageBySlug(slugParts);
  if (!resolved) notFound();
  return (
    <>
      <PageMetadataBar
        title={resolved.title}
        summary={resolved.summary}
        updated={resolved.updated}
        owner={resolved.owner}
        reviewBy={resolved.reviewBy}
        status={resolved.status}
      />
      <MarkdownRenderer content={resolved.content} />
    </>
  );
}
