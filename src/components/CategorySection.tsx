'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/news';

interface Props {
  title: string;
  slug: string;
  articles: Article[];
  variant?: 'featured' | 'standard' | 'compact';
}

export default function CategorySection({ title, slug, articles, variant = 'standard' }: Props) {
  if (!articles.length) return null;

  const mainArticle = articles[0];
  const subArticles = articles.slice(1, 5);
  const listArticles = articles.slice(5, 10);

  if (variant === 'compact') {
    return (
      <section className="bg-white">
        <div className="flex items-center justify-between border-b-2 border-[#a70000] mb-3">
          <h2 className="text-base font-bold text-[#a70000] pb-1">{title}</h2>
          <Link href={`/category/${slug}`} className="text-xs text-gray-500 hover:text-[#a70000]">
            Xem thêm &raquo;
          </Link>
        </div>
        <div className="space-y-3">
          {articles.slice(0, 5).map((article, index) => (
            <article key={article.id} className="group">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {index === 0 && article.thumbnail && (
                  <div className="relative aspect-[16/9] mb-2 overflow-hidden">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="300px"
                    />
                  </div>
                )}
                <h3 className={`${index === 0 ? 'text-base font-semibold' : 'text-sm'} text-gray-900 group-hover:text-[#a70000] transition-colors line-clamp-2`}>
                  {article.title}
                </h3>
              </a>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'featured') {
    return (
      <section className="bg-white">
        <div className="flex items-center justify-between border-b-2 border-[#a70000] mb-4">
          <h2 className="text-lg font-bold text-[#a70000] pb-1">{title}</h2>
          <Link href={`/category/${slug}`} className="text-xs text-gray-500 hover:text-[#a70000]">
            Xem thêm &raquo;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main article - takes 2 columns */}
          <div className="lg:col-span-2">
            <article className="group">
              <a href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="block">
                {mainArticle.thumbnail && (
                  <div className="relative aspect-[16/9] mb-3 overflow-hidden">
                    <Image
                      src={mainArticle.thumbnail}
                      alt={mainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#a70000] transition-colors mb-2">
                  {mainArticle.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {mainArticle.description}
                </p>
              </a>
            </article>

            {/* Sub articles in grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {subArticles.map((article) => (
                <article key={article.id} className="group">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                    {article.thumbnail && (
                      <div className="relative aspect-[16/10] mb-2 overflow-hidden">
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="200px"
                        />
                      </div>
                    )}
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#a70000] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar list */}
          <div className="lg:col-span-1 border-l border-gray-100 pl-4">
            <ul className="space-y-3">
              {listArticles.map((article) => (
                <li key={article.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-800 hover:text-[#a70000] transition-colors line-clamp-2 block"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  // Standard variant
  return (
    <section className="bg-white">
      <div className="flex items-center justify-between border-b-2 border-[#a70000] mb-4">
        <h2 className="text-lg font-bold text-[#a70000] pb-1">{title}</h2>
        <Link href={`/category/${slug}`} className="text-xs text-gray-500 hover:text-[#a70000]">
          Xem thêm &raquo;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Main article */}
        <div className="md:col-span-2">
          <article className="group">
            <a href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="block">
              {mainArticle.thumbnail && (
                <div className="relative aspect-[16/9] mb-2 overflow-hidden">
                  <Image
                    src={mainArticle.thumbnail}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#a70000] transition-colors mb-1">
                {mainArticle.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {mainArticle.description}
              </p>
            </a>
          </article>
        </div>

        {/* Sub articles */}
        {subArticles.map((article) => (
          <article key={article.id} className="group">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
              {article.thumbnail && (
                <div className="relative aspect-[16/10] mb-2 overflow-hidden">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="250px"
                  />
                </div>
              )}
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#a70000] transition-colors line-clamp-2">
                {article.title}
              </h4>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
