'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleDetail {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  author: string;
  category: string;
  url: string;
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-[800px]">
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="aspect-[16/9] bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Main article content component
function ArticleContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!url) {
        setError('Không tìm thấy bài viết');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/news/article?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
          setArticle(data.article);
        } else {
          setError(data.error || 'Không thể tải bài viết');
        }
      } catch {
        setError('Lỗi kết nối');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [url]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-[800px]">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Không thể tải bài viết</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/" className="text-[#B80000] hover:underline">
              ← Quay về trang chủ
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-[800px]">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-6 pt-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#B80000]">Trang chủ</Link>
              <span>/</span>
              {article.category && (
                <>
                  <span className="text-[#B80000]">{article.category}</span>
                  <span>/</span>
                </>
              )}
              <span className="truncate max-w-[200px]">{article.title}</span>
            </nav>
          </div>

          {/* Title */}
          <header className="px-6 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              {article.publishedAt && (
                <span>{article.publishedAt}</span>
              )}
              {article.author && (
                <>
                  <span>|</span>
                  <span>{article.author}</span>
                </>
              )}
            </div>
          </header>

          {/* Description */}
          {article.description && (
            <div className="px-6 pb-4">
              <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                {article.description}
              </p>
            </div>
          )}

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="relative aspect-[16/9] mx-6 mb-6 overflow-hidden rounded-lg">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          )}

          {/* Content */}
          <div className="px-6 pb-6">
            <div
              className="prose prose-lg max-w-none
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-img:rounded-lg prose-img:my-4
                prose-figcaption:text-sm prose-figcaption:text-gray-500 prose-figcaption:text-center prose-figcaption:italic"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Source link */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#B80000] hover:underline"
            >
              Xem bài gốc trên VnExpress →
            </a>
          </div>
        </article>

        {/* Back button */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#B80000] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay về trang chủ
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Main export with Suspense wrapper
export default function ArticlePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ArticleContent />
    </Suspense>
  );
}
