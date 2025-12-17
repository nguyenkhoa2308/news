"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import {
  postsAPI,
  normalizeArticles,
  type Article,
  type NormalizedArticle,
} from "@/lib/api-endpoints";
import { useCategories } from "@/stores/category-store";
import LatestNewsSection from "@/components/LatestNewsSection";

// Type cho news data theo category
type NewsByCategoryData = Record<string, Article[]>;

export default function Home() {
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const [newsData, setNewsData] = useState<NewsByCategoryData>({});
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [showBottomSections, setShowBottomSections] = useState(true);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const bottomObserver = useRef<HTMLDivElement>(null);

  // Fetch articles when categories are loaded
  useEffect(() => {
    if (isCategoriesLoading || categories.length === 0) return;

    async function fetchArticles() {
      try {
        const results = await Promise.all(
          categories.map(async (cat) => {
            try {
              const { data } = await postsAPI.getByCategory(cat.slug, {
                limit: 10,
              });
              return { slug: cat.slug, articles: data || [] };
            } catch (err) {
              console.error(`Error fetching ${cat.slug}:`, err);
              return { slug: cat.slug, articles: [] };
            }
          })
        );

        const dataByCategory: NewsByCategoryData = {};
        results.forEach(({ slug, articles }) => {
          dataByCategory[slug] = articles;
        });

        setNewsData(dataByCategory);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoadingNews(false);
      }
    }

    fetchArticles();
  }, [categories, isCategoriesLoading]);

  // Observer for bottom sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !showBottomSections &&
          !isLoadingBottom
        ) {
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

  // Lấy tin theo section (đã normalize)
  const getNewsBySection = (slug: string): NormalizedArticle[] => {
    const articles = newsData?.[slug] || [];
    return normalizeArticles(articles);
  };

  const isLoading = isCategoriesLoading || isLoadingNews;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-[1200px]">
          {/* Top story skeleton */}
          <div className="mb-6 bg-white p-4 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-[16/10] bg-gray-200 rounded"></div>
              <div className="flex flex-col justify-center gap-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          {/* Secondary news skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-3 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-[120px] h-[75px] bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Main layout skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-4">
              <div className="bg-white p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <div className="w-[100px] h-[60px] bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <main className="lg:col-span-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[16/10] bg-gray-200 rounded"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-4 bg-gray-200 rounded w-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </main>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Chia categories: featured (đầu tiên), main (tiếp theo), bottom (còn lại)
  const featuredCategory = categories[0];
  const mainCategories = categories.slice(1, 6);
  const bottomCategories = categories.slice(6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-[1200px]">
        {/* ========== TOP FEATURED SECTION ========== */}
        {featuredCategory && (
          <CategorySection
            title={featuredCategory.name}
            slug={featuredCategory.slug}
            articles={getNewsBySection(featuredCategory.slug)}
            variant="grid"
          />
        )}

        {/* ========== MAIN LAYOUT: Left Sidebar + Right Content ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* LEFT SIDEBAR - Tin mới nhất */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[160px]">
              <LatestNewsSection />
            </div>
          </aside>

          {/* RIGHT CONTENT - Sections từ API */}
          <main className="lg:col-span-8 space-y-6">
            {mainCategories.map((cat) => (
              <CategorySection
                key={cat._id}
                title={cat.name}
                slug={cat.slug}
                articles={getNewsBySection(cat.slug)}
                variant="sidebar"
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
        {showBottomSections && bottomCategories.length > 0 && (
          <>
            {/* Bottom categories - Full width */}
            <div className="mt-8 space-y-6">
              {bottomCategories.map((cat) => (
                <CategorySection
                  key={cat._id}
                  title={cat.name}
                  slug={cat.slug}
                  articles={getNewsBySection(cat.slug)}
                  variant="grid"
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
