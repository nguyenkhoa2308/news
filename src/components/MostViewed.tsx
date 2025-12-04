'use client';

import { Article } from '@/types/news';

interface Props {
  articles: Article[];
}

export default function MostViewed({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <section className="bg-white">
      <div className="border-b-2 border-[#a70000] mb-3">
        <h2 className="text-base font-bold text-[#a70000] pb-1">Xem nhiều</h2>
      </div>
      <ol className="space-y-3">
        {articles.slice(0, 10).map((article, index) => (
          <li key={article.id} className="flex gap-3 group">
            <span className={`text-2xl font-bold ${index < 3 ? 'text-[#a70000]' : 'text-gray-400'} w-6 flex-shrink-0`}>
              {index + 1}
            </span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-800 hover:text-[#a70000] transition-colors line-clamp-2"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
