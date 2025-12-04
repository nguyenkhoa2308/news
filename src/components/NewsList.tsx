'use client';

import { Article } from '@/types/news';
import ArticleCard from './ArticleCard';
import FeaturedArticle from './FeaturedArticle';

interface Props {
  articles: Article[];
  loading?: boolean;
}

export default function NewsList({ articles, loading }: Props) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 aspect-[16/9] rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-8 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 py-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-32 h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        Không có tin tức nào
      </div>
    );
  }

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <div>
      {/* Featured article */}
      <FeaturedArticle article={featuredArticle} />

      {/* Article list */}
      <div className="mt-6">
        {restArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
