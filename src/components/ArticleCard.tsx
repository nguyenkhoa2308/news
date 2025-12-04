'use client';

import Image from 'next/image';
import { Article } from '@/types/news';

interface Props {
  article: Article;
  variant?: 'horizontal' | 'vertical';
}

export default function ArticleCard({ article, variant = 'horizontal' }: Props) {
  if (variant === 'vertical') {
    return (
      <article className="group">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative aspect-[16/10] mb-2 overflow-hidden rounded">
            {article.thumbnail ? (
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#B80000] transition-colors line-clamp-2">
            {article.title}
          </h3>
        </a>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex gap-4 w-full">
        <div className="flex-1 min-w-0">
          <span className="text-xs text-[#B80000] font-medium mb-1 block">
            {article.category}
          </span>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#B80000] transition-colors line-clamp-2 mb-1">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {article.description}
          </p>
        </div>
        <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="128px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>
      </a>
    </article>
  );
}
