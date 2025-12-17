"use client";

import Image from "next/image";
import Link from "next/link";
import type { NormalizedArticle } from "@/lib/api-endpoints";

interface Props {
  article: NormalizedArticle;
}

// Format date: "2 giờ trước" or "11/12/2025 - 10:30"
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    }
    if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    }

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export default function LatestNewsCard({ article }: Props) {
  return (
    <article className="group border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      <Link href={article.url} className="block">
        {/* Title - full width, top */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#B80000] transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Image | Description + Date */}
        <div className="flex gap-3">
          {/* Thumbnail - left */}
          <div className="relative w-[120px] h-[80px] flex-shrink-0 overflow-hidden rounded">
            {article.thumbnail ? (
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="120px"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>

          {/* Description + Date - right */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <p className="text-sm text-gray-600 line-clamp-2">
              {article.description}
            </p>
            <span className="text-xs text-gray-400 mt-1">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
