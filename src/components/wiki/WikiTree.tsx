"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react";
import { useState } from "react";
import type { WikiTreeNode } from "@/lib/wiki/types";

function TreeItem({
  node,
  depth,
  activeSlug,
}: {
  node: WikiTreeNode;
  depth: number;
  activeSlug: string;
}) {
  const [open, setOpen] = useState(() => {
    if (node.type === "page") return false;
    return activeSlug.startsWith(node.slug + "/") || activeSlug === node.slug;
  });

  const isActive = node.type === "page" && activeSlug === node.slug;
  const paddingLeft = 8 + depth * 12;

  if (node.type === "folder") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-1 rounded-md py-1.5 pr-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          style={{ paddingLeft }}
        >
          {open ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
          )}
          <Folder className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate font-medium">{node.title}</span>
        </button>
        {open &&
          node.children.map((child) => (
            <TreeItem
              key={`${child.type}-${child.slug}`}
              node={child}
              depth={depth + 1}
              activeSlug={activeSlug}
            />
          ))}
      </div>
    );
  }

  return (
    <Link
      href={`/wiki/${node.slug}`}
      className={`flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-sm hover:bg-gray-100 ${
        isActive ? "bg-blue-50 font-medium text-blue-700" : "text-gray-700"
      }`}
      style={{ paddingLeft: paddingLeft + 20 }}
    >
      <FileText className="h-4 w-4 shrink-0 opacity-60" />
      <span className="truncate">{node.title}</span>
    </Link>
  );
}

export function WikiTree({
  tree,
  activeSlug,
}: {
  tree: WikiTreeNode[];
  activeSlug: string;
}) {
  return (
    <nav className="space-y-0.5 py-2">
      {tree.map((node) => (
        <TreeItem
          key={`${node.type}-${node.slug}`}
          node={node}
          depth={0}
          activeSlug={activeSlug}
        />
      ))}
    </nav>
  );
}
