'use client';

import { useState, useEffect, use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Article, categories } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';

// Sub-menus cho từng category
const categorySubMenus: Record<string, string[]> = {
  'thoi-su': ['Chính trị', 'Dân sinh', 'Lao động - Việc làm', 'Giao thông', 'Mekong'],
  'the-gioi': ['Tư liệu', 'Phân tích', 'Người Việt 5 châu', 'Cuộc sống đó đây'],
  'kinh-doanh': ['Quốc tế', 'Doanh nghiệp', 'Chứng khoán', 'Ebank', 'Vĩ mô'],
  'the-thao': ['Bóng đá', 'Tennis', 'V-League', 'Marathon', 'Hậu trường'],
  'giai-tri': ['Giới sao', 'Phim', 'Nhạc', 'Thời trang', 'Làm đẹp'],
  'phap-luat': ['Hồ sơ phá án', 'Góc nhìn luật gia', 'Tư vấn'],
  'suc-khoe': ['Tin tức', 'Sống khỏe', 'Các bệnh', 'Vaccine'],
  'doi-song': ['Tổ ấm', 'Tiêu dùng', 'Bài học sống', 'Cooking'],
  'goc-nhin': ['Thời sự', 'Đời sống', 'Kinh doanh'],
  'bat-dong-san': ['Chính sách', 'Thị trường', 'Dự án', 'Không gian sống'],
};

// Helper function để tính thời gian
const getTimeAgo = (publishedAt: string) => {
  const now = new Date();
  const timestamp = parseInt(publishedAt) * 1000;
  const published = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Vừa xong';
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  return published.toLocaleDateString('vi-VN');
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const category = categories.find((c) => c.slug === slug);
  const subMenus = categorySubMenus[slug] || [];

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?category=${slug}`);
        const data = await res.json();

        if (data.success) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [slug]);

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4, 8);
  const listArticles = articles.slice(8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-[1200px]">
        {/* Category Header với Sub-menus */}
        <div className="bg-white mb-6">
          <div className="flex items-center gap-4 px-4 py-3 border-b-2 border-[#b80000]">
            <h1 className="text-xl font-bold text-[#b80000]">
              {category?.name || slug}
            </h1>
            {subMenus.length > 0 && (
              <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {subMenus.map((sub, idx) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1 text-[13px] whitespace-nowrap transition-colors rounded ${
                      activeTab === idx
                        ? 'text-[#b80000] font-medium bg-red-50'
                        : 'text-gray-600 hover:text-[#b80000]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : articles.length === 0 ? (
          <div className="bg-white p-12 text-center text-gray-500">
            Không có tin tức nào trong chuyên mục này
          </div>
        ) : (
          <>
            {/* Top Section: Featured + Secondary */}
            <section className="bg-white mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Featured Article - 7 cols */}
                {featuredArticle && (
                  <div className="lg:col-span-7 p-4 lg:border-r border-gray-100">
                    <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="group block">
                      {featuredArticle.thumbnail && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                          <Image
                            src={featuredArticle.thumbnail}
                            alt={featuredArticle.title}
                            fill
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#b80000] transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-2">
                        {featuredArticle.description}
                      </p>
                      <span className="text-xs text-gray-500">{getTimeAgo(featuredArticle.publishedAt)}</span>
                    </a>
                  </div>
                )}

                {/* Secondary Articles - 5 cols */}
                <div className="lg:col-span-5 divide-y divide-gray-100">
                  {secondaryArticles.map((article) => (
                    <div key={article.id} className="p-4">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex gap-3">
                        {article.thumbnail && (
                          <div className="relative w-[140px] h-[85px] flex-shrink-0 overflow-hidden bg-gray-100">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-3 leading-snug">
                            {article.title}
                          </h3>
                          <span className="text-xs text-gray-500 mt-1 block">{getTimeAgo(article.publishedAt)}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Grid Section - 4 articles */}
            {gridArticles.length > 0 && (
              <section className="bg-white p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gridArticles.map((article) => (
                    <article key={article.id}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block">
                        {article.thumbnail && (
                          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-2">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-3 leading-snug">
                          {article.title}
                        </h3>
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Main Content + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content - 8 cols */}
              <div className="lg:col-span-8">
                <div className="bg-white">
                  <div className="px-4 py-3 border-b-2 border-[#b80000]">
                    <h2 className="text-base font-bold text-gray-900">Tin mới nhất</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {listArticles.map((article) => (
                      <article key={article.id} className="p-4">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex gap-4">
                          {article.thumbnail && (
                            <div className="relative w-[200px] h-[120px] flex-shrink-0 overflow-hidden bg-gray-100">
                              <Image
                                src={article.thumbnail}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug mb-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">
                              {article.description}
                            </p>
                            <span className="text-xs text-gray-500">{getTimeAgo(article.publishedAt)}</span>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - 4 cols */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Xem nhiều */}
                <div className="bg-white">
                  <div className="px-4 py-3 border-b-2 border-[#b80000]">
                    <h2 className="text-base font-bold text-gray-900">Xem nhiều</h2>
                  </div>
                  <div className="p-4">
                    {articles.slice(0, 5).map((article, index) => (
                      <div key={article.id} className={`flex gap-3 ${index < 4 ? 'pb-3 mb-3 border-b border-gray-100' : ''}`}>
                        <span className={`text-xl font-bold leading-none pt-0.5 ${index < 3 ? 'text-[#b80000]' : 'text-gray-400'}`}>
                          {index + 1}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-[13px] text-gray-900 hover:text-[#b80000] leading-snug line-clamp-3"
                        >
                          {article.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chuyên mục khác */}
                <div className="bg-white">
                  <div className="px-4 py-3 border-b-2 border-blue-600">
                    <h2 className="text-base font-bold text-gray-900">Chuyên mục khác</h2>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {categories
                        .filter((c) => c.slug !== slug)
                        .slice(0, 10)
                        .map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="px-3 py-1.5 text-[13px] bg-gray-100 text-gray-700 hover:bg-[#b80000] hover:text-white transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Tin liên quan (sticky) */}
                <div className="bg-white sticky top-[100px]">
                  <div className="px-4 py-3 border-b-2 border-green-600">
                    <h2 className="text-base font-bold text-gray-900">Có thể bạn quan tâm</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    {articles.slice(5, 10).map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex gap-3"
                      >
                        {article.thumbnail && (
                          <div className="relative w-[80px] h-[50px] flex-shrink-0 overflow-hidden bg-gray-100">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h4 className="flex-1 text-[13px] text-gray-900 group-hover:text-[#b80000] leading-snug line-clamp-3">
                          {article.title}
                        </h4>
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* Loading Skeleton */
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top section skeleton */}
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] bg-gray-200 animate-pulse mb-3"></div>
            <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
          </div>
          <div className="lg:col-span-5 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-[140px] h-[85px] bg-gray-200 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="bg-white p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="aspect-[16/10] bg-gray-200 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* List skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 pb-4 border-b border-gray-100">
              <div className="w-[200px] h-[120px] bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 bg-white p-4">
          <div className="h-6 bg-gray-200 animate-pulse mb-4 w-1/3"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 mb-3">
              <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
              <div className="flex-1 h-4 bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
