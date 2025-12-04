'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Article } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';
import { staticNewsData, NewsData } from '@/data/news-data';

// Định nghĩa các section với sub-menu
const SECTIONS_MAIN = [
  {
    id: 'thoi-su',
    name: 'Thời sự',
    slug: 'thoi-su',
    subMenus: ['Chính trị', 'Dân sinh', 'Lao động - Việc làm', 'Giao thông'],
  },
  {
    id: 'the-gioi',
    name: 'Thế giới',
    slug: 'the-gioi',
    subMenus: ['Tư liệu', 'Phân tích', 'Người Việt 5 châu', 'Cuộc sống đó đây'],
  },
  {
    id: 'kinh-doanh',
    name: 'Kinh doanh',
    slug: 'kinh-doanh',
    subMenus: ['Quốc tế', 'Doanh nghiệp', 'Chứng khoán', 'Bất động sản'],
  },
];

const SECTIONS_BOTTOM = [
  {
    id: 'the-thao',
    name: 'Thể thao',
    slug: 'the-thao',
    subMenus: ['Bóng đá', 'Tennis', 'V-League', 'Marathon'],
  },
  {
    id: 'giai-tri',
    name: 'Giải trí',
    slug: 'giai-tri',
    subMenus: ['Giới sao', 'Phim', 'Nhạc', 'Thời trang'],
  },
  {
    id: 'phap-luat',
    name: 'Pháp luật',
    slug: 'phap-luat',
    subMenus: ['Hồ sơ phá án', 'Góc nhìn luật gia', 'Tư vấn'],
  },
];

// Helper function để tính thời gian đã đăng
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

export default function Home() {
  const [newsData, setNewsData] = useState<NewsData>(staticNewsData);
  const [showBottomSections, setShowBottomSections] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const bottomObserver = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news?multi=,thoi-su,the-gioi,kinh-doanh,giai-tri,the-thao,phap-luat,suc-khoe,doi-song');
        const data = await response.json();
        if (data.success) {
          setNewsData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    }
    fetchNews();
  }, []);

  // Observer for bottom sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !showBottomSections && !isLoadingBottom) {
          setIsLoadingBottom(true);
          setTimeout(() => {
            setShowBottomSections(true);
            setIsLoadingBottom(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomObserver.current) {
      observer.observe(bottomObserver.current);
    }

    return () => observer.disconnect();
  }, [showBottomSections, isLoadingBottom]);

  const homeArticles = newsData?.home || [];
  const topNews = homeArticles[0];
  const secondaryNews = homeArticles.slice(1, 4);
  const latestNews = homeArticles.slice(0, 15);

  // Lấy tin theo section
  const getNewsBySection = (slug: string) => {
    return newsData?.[slug] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-[1200px]">

        {/* ========== TOP FEATURED STORY ========== */}
        {topNews && (
          <section className="mb-6">
            <a href={topNews.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
                {/* Image Left */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {topNews.thumbnail && (
                    <Image
                      src={topNews.thumbnail}
                      alt={topNews.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                {/* Content Right */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#b80000] transition-colors leading-tight">
                    {topNews.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
                    {topNews.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{getTimeAgo(topNews.publishedAt)}</span>
                    <span>•</span>
                    <span className="text-[#b80000]">{topNews.category}</span>
                  </div>
                </div>
              </div>
            </a>
          </section>
        )}

        {/* ========== 3 SECONDARY NEWS ========== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
          {secondaryNews.map((article) => (
            <article key={article.id} className="group bg-white">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex gap-3 p-3">
                {article.thumbnail && (
                  <div className="relative w-[120px] h-[75px] flex-shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-3 mb-1 leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{getTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </section>

        {/* ========== MAIN LAYOUT: Left Sidebar + Right Content ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT SIDEBAR - Tin mới nhất (4/12) */}
          <aside className="lg:col-span-4">
            <div className="bg-white sticky top-[100px]">
              <div className="border-b-2 border-[#b80000] px-4 py-3">
                <h2 className="text-lg font-bold text-gray-900">Mới nhất</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {latestNews.map((article) => (
                  <article key={article.id} className="group p-3">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex gap-3">
                      {article.thumbnail && (
                        <div className="relative w-[100px] h-[60px] flex-shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-3 leading-snug">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{getTimeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT - Sections chính (8/12) */}
          <main className="lg:col-span-8 space-y-6">
            {SECTIONS_MAIN.map((section) => (
              <CategorySection
                key={section.id}
                section={section}
                articles={getNewsBySection(section.slug)}
              />
            ))}
          </main>
        </div>

        {/* Observer target for bottom sections */}
        <div ref={bottomObserver} className="h-1 mt-6"></div>

        {/* Loading indicator */}
        {isLoadingBottom && (
          <div className="py-8 flex justify-center">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-5 h-5 border-2 border-[#b80000] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Đang tải thêm...</span>
            </div>
          </div>
        )}

        {/* ========== BOTTOM SECTIONS - Lazy loaded ========== */}
        {showBottomSections && (
          <>
            {/* Thể thao, Giải trí, Pháp luật - Full width */}
            <div className="mt-8 space-y-6">
              {SECTIONS_BOTTOM.map((section) => (
                <CategorySectionFull
                  key={section.id}
                  section={section}
                  articles={getNewsBySection(section.slug)}
                />
              ))}
            </div>

            {/* Có thể bạn quan tâm */}
            <section className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-white">
                <div className="border-b-2 border-green-600 px-4 py-3">
                  <h2 className="text-lg font-bold text-gray-900">Có thể bạn quan tâm</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                  {homeArticles.slice(5, 13).map((article) => (
                    <article key={article.id} className="group">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
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
              </div>
            </section>

            {/* Sức khỏe & Đời sống Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <SectionSmall
                title="Sức khỏe"
                slug="suc-khoe"
                articles={newsData?.['suc-khoe'] || []}
                subMenus={['Tin tức', 'Sống khỏe', 'Các bệnh', 'Vaccine']}
              />
              <SectionSmall
                title="Đời sống"
                slug="doi-song"
                articles={newsData?.['doi-song'] || []}
                subMenus={['Tổ ấm', 'Tiêu dùng', 'Bài học sống', 'Cooking']}
              />
            </div>

            {/* Đọc nhiều */}
            <section className="mt-6">
              <div className="bg-white">
                <div className="border-b-2 border-orange-500 px-4 py-3">
                  <h2 className="text-lg font-bold text-gray-900">Đọc nhiều</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {homeArticles.slice(0, 6).map((article, index) => (
                    <article key={article.id} className="group flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded ${
                          index === 0 ? 'bg-red-600 text-white' :
                          index === 1 ? 'bg-orange-500 text-white' :
                          index === 2 ? 'bg-yellow-500 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex gap-3">
                        {article.thumbnail && (
                          <div className="relative w-[120px] h-[75px] flex-shrink-0 overflow-hidden bg-gray-100">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                            {article.description}
                          </p>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}

/* ============================================
   CATEGORY SECTION - With sub-menu tabs
   ============================================ */
function CategorySection({
  section,
  articles,
}: {
  section: { id: string; name: string; slug: string; subMenus: string[] };
  articles: Article[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!articles.length || articles.length < 2) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 6);

  return (
    <section className="bg-white">
      {/* Section Header with Sub-menus */}
      <div className="flex items-center gap-4 px-4 py-3 border-b-2 border-[#b80000]">
        <Link
          href={`/category/${section.slug}`}
          className="text-lg font-bold text-[#b80000] hover:underline flex-shrink-0"
        >
          {section.name}
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {section.subMenus.map((sub, idx) => (
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
      </div>

      {/* Content Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Left: Main Article with Image */}
        <article>
          <a href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="group block">
            {mainArticle.thumbnail && (
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                <Image
                  src={mainArticle.thumbnail}
                  alt={mainArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
              {mainArticle.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
              {mainArticle.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{getTimeAgo(mainArticle.publishedAt)}</span>
            </div>
          </a>
        </article>

        {/* Right: Side Articles - Text Only with bullets */}
        <div className="space-y-3">
          {sideArticles.map((article) => (
            <article key={article.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2">
                <span className="text-[#b80000] mt-1">•</span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>{getTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CATEGORY SECTION FULL - Full width with grid
   ============================================ */
function CategorySectionFull({
  section,
  articles,
}: {
  section: { id: string; name: string; slug: string; subMenus: string[] };
  articles: Article[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!articles.length || articles.length < 2) return null;

  const mainArticle = articles[0];
  const gridArticles = articles.slice(1, 5);

  return (
    <section className="bg-white">
      {/* Section Header with Sub-menus */}
      <div className="flex items-center gap-4 px-4 py-3 border-b-2 border-[#b80000]">
        <Link
          href={`/category/${section.slug}`}
          className="text-lg font-bold text-[#b80000] hover:underline flex-shrink-0"
        >
          {section.name}
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {section.subMenus.map((sub, idx) => (
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
        <Link
          href={`/category/${section.slug}`}
          className="text-sm text-gray-600 hover:text-[#b80000] transition-colors ml-auto flex-shrink-0"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Content: Main + 4 Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Article - 6 cols */}
          <article className="md:col-span-6">
            <a href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="group block">
              {mainArticle.thumbnail && (
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={mainArticle.thumbnail}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
                {mainArticle.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {mainArticle.description}
              </p>
            </a>
          </article>

          {/* Grid Articles - 6 cols (2x2 grid) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
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
                  <h4 className="text-[13px] font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION SMALL - For 2-column layout with sub-menus
   ============================================ */
function SectionSmall({
  title,
  slug,
  articles,
  subMenus = [],
}: {
  title: string;
  slug: string;
  articles: Article[];
  subMenus?: string[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!articles.length) return null;

  const mainArticle = articles[0];
  const listArticles = articles.slice(1, 5);

  return (
    <section className="bg-white">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b-2 border-[#b80000]">
        <Link href={`/category/${slug}`} className="text-base font-bold text-[#b80000]">
          {title}
        </Link>
        {subMenus.length > 0 && (
          <nav className="flex items-center gap-1">
            {subMenus.slice(0, 3).map((sub, idx) => (
              <button
                key={sub}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-2 py-0.5 text-[12px] whitespace-nowrap transition-colors rounded ${
                  activeTab === idx
                    ? 'text-[#b80000] font-medium'
                    : 'text-gray-500 hover:text-[#b80000]'
                }`}
              >
                {sub}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="p-4">
        {/* Main Article */}
        <a href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="block group mb-4">
          {mainArticle.thumbnail && (
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-2">
              <Image
                src={mainArticle.thumbnail}
                alt={mainArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-[#b80000] transition-colors line-clamp-2 leading-snug">
            {mainArticle.title}
          </h3>
        </a>

        {/* List Articles */}
        <ul className="border-t border-gray-100 pt-3 space-y-2">
          {listArticles.map((article) => (
            <li key={article.id}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[13px] text-gray-900 hover:text-[#b80000] leading-snug"
              >
                <span className="text-[#b80000] mt-0.5">•</span>
                <span className="line-clamp-2">{article.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
