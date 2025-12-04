'use client';

import Image from 'next/image';
import { Article } from '@/types/news';

interface Props {
  article: Article;
}

export default function FeaturedArticle({ article }: Props) {
  return (
    <article className="group">
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-lg">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-[#B80000] text-white text-xs font-medium px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#B80000] transition-colors mb-2 line-clamp-3">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3">
          {article.description}
        </p>
      </a>
    </article>
  );
}
