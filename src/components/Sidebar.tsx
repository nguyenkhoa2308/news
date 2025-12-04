'use client';

import { Article } from '@/types/news';
import ArticleCard from './ArticleCard';

interface Props {
  articles: Article[];
  title: string;
}

export default function Sidebar({ articles, title }: Props) {
  return (
    <aside className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#B80000]">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} variant="vertical" />
        ))}
      </div>
    </aside>
  );
}
