"use client";

import Image from "next/image";
import Link from "next/link";
import { NormalizedArticle } from "@/lib/api-endpoints";

interface Props {
  title: string;
  slug: string;
  articles: NormalizedArticle[];
  variant?: "featured" | "standard" | "compact" | "grid" | "sidebar";
  subMenus?: string[];
  useInternalLinks?: boolean;
}

// Helper: tạo URL chi tiết bài viết
const getArticleUrl = (url: string) =>
  `/article?url=${encodeURIComponent(url)}`;

// Helper: Convert Vietnamese text to URL slug
const toSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Helper function để tính thời gian đã đăng
const getTimeAgo = (publishedAt: string) => {
  if (
    publishedAt.includes("trước") ||
    publishedAt.includes("phút") ||
    publishedAt.includes("giờ")
  ) {
    return publishedAt;
  }
  const date = new Date(publishedAt);
  if (!isNaN(date.getTime())) {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  }
  return publishedAt || "Vừa xong";
};

// Section Header - extracted outside main component
function SectionHeader({
  title,
  slug,
  subMenus = [],
  showSubMenus = false,
}: {
  title: string;
  slug: string;
  subMenus?: string[];
  showSubMenus?: boolean;
}) {
  return (
    <div
      className={`flex items-center ${
        showSubMenus ? "gap-4 px-5 py-3" : "justify-between px-5 py-3"
      } border-l-4 border-[#c41e3a] bg-gradient-to-r from-gray-50 to-white`}
    >
      <Link
        href={`/category/${slug}`}
        className="text-[17px] font-bold text-[#c41e3a] hover:text-[#a01830] transition-colors flex-shrink-0 tracking-tight"
      >
        {title}
      </Link>
      {showSubMenus && subMenus.length > 0 && (
        <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {subMenus.map((sub) => (
            <Link
              key={sub}
              href={`/category/${slug}?sub=${toSlug(sub)}`}
              className="px-3 py-1.5 text-[13px] whitespace-nowrap transition-all duration-200 rounded-full text-gray-600 hover:text-[#c41e3a] hover:bg-red-50"
            >
              {sub}
            </Link>
          ))}
        </nav>
      )}
      <Link
        href={`/category/${slug}`}
        className={`text-[13px] font-medium text-gray-500 hover:text-[#c41e3a] transition-colors ${
          showSubMenus ? "ml-auto" : ""
        } flex-shrink-0 whitespace-nowrap`}
      >
        {showSubMenus ? "Xem tất cả →" : "Xem thêm »"}
      </Link>
    </div>
  );
}

export default function CategorySection({
  title,
  slug,
  articles,
  variant = "standard",
  subMenus = [],
  useInternalLinks = true,
}: Props) {
  if (!articles.length) return null;

  const mainArticle = articles[0];
  const subArticles = articles.slice(1, 5);
  const sideArticles = articles.slice(1, 6);
  const listArticles = articles.slice(5, 10);
  const gridArticles = articles.slice(1, 5);

  // Helper to get article link
  const getLink = (url: string) =>
    useInternalLinks ? getArticleUrl(url) : url;
  const linkProps = useInternalLinks
    ? {}
    : { target: "_blank" as const, rel: "noopener noreferrer" };

  // Variant: Compact - Simple list
  if (variant === "compact") {
    return (
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-l-4 border-[#c41e3a] bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-[15px] font-bold text-[#c41e3a] tracking-tight">{title}</h2>
          <Link
            href={`/category/${slug}`}
            className="text-xs font-medium text-gray-500 hover:text-[#c41e3a] transition-colors"
          >
            Xem thêm &raquo;
          </Link>
        </div>
        <div className="p-4 space-y-4">
          {articles.slice(0, 5).map((article, index) => (
            <article key={article.id} className="group">
              <Link href={getLink(article.url)} {...linkProps}>
                {index === 0 && article.thumbnail && (
                  <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-lg">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <h3
                  className={`${
                    index === 0 ? "text-[15px] font-bold" : "text-[14px] font-medium"
                  } text-gray-800 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug`}
                >
                  {article.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Variant: Sidebar - Main article + side list with bullets (for right column)
  if (variant === "sidebar") {
    return (
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <SectionHeader
          title={title}
          slug={slug}
          subMenus={subMenus}
          showSubMenus={subMenus.length > 0}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          {/* Left: Main Article with Image */}
          <article>
            <Link
              href={getLink(mainArticle.url)}
              className="group block"
              {...linkProps}
            >
              {mainArticle.thumbnail && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 mb-4 shadow-sm">
                  <Image
                    src={mainArticle.thumbnail}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <h3 className="text-[16px] font-bold text-gray-800 mb-2 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug">
                {mainArticle.title}
              </h3>
              <p className="text-[14px] text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {mainArticle.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{getTimeAgo(mainArticle.publishedAt)}</span>
              </div>
            </Link>
          </article>

          {/* Right: Side Articles - Text Only with bullets */}
          {sideArticles.length > 0 && (
            <div className="space-y-0">
              {sideArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`py-3 ${index !== sideArticles.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Link
                    href={getLink(article.url)}
                    className="group flex items-start gap-3"
                    {...linkProps}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-medium text-gray-700 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{getTimeAgo(article.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Variant: Grid - Full width with main article + grid articles
  if (variant === "grid") {
    return (
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <SectionHeader
          title={title}
          slug={slug}
          subMenus={subMenus}
          showSubMenus={subMenus.length > 0}
        />

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Main Article - full width if no grid articles, else 6 cols */}
            <article
              className={gridArticles.length > 0 ? "md:col-span-6" : "md:col-span-12"}
            >
              <Link
                href={getLink(mainArticle.url)}
                className="group block"
                {...linkProps}
              >
                {mainArticle.thumbnail && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 mb-4 shadow-sm">
                    <Image
                      src={mainArticle.thumbnail}
                      alt={mainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-2.5 py-1 bg-[#c41e3a] text-white text-[11px] font-medium rounded mb-2">
                        {title}
                      </span>
                    </div>
                  </div>
                )}
                <h3 className="text-[18px] font-bold text-gray-800 mb-2 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-tight">
                  {mainArticle.title}
                </h3>
                <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                  {mainArticle.description}
                </p>
              </Link>
            </article>

            {/* Grid Articles - 6 cols (2x2 grid) */}
            {gridArticles.length > 0 && (
              <div className="md:col-span-6 grid grid-cols-2 gap-4">
                {gridArticles.map((article) => (
                  <article key={article.id} className="group">
                    <Link
                      href={getLink(article.url)}
                      className="block"
                      {...linkProps}
                    >
                      {article.thumbnail && (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 mb-3 shadow-sm">
                          <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      <h4 className="text-[13px] font-semibold text-gray-700 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Variant: Featured - Main + sub grid + sidebar list
  if (variant === "featured") {
    return (
      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <SectionHeader
          title={title}
          slug={slug}
          subMenus={subMenus}
          showSubMenus={subMenus.length > 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
          {/* Main article - takes 2 columns */}
          <div className="lg:col-span-2">
            <article className="group">
              <Link
                href={getLink(mainArticle.url)}
                className="block"
                {...linkProps}
              >
                {mainArticle.thumbnail && (
                  <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg shadow-sm">
                    <Image
                      src={mainArticle.thumbnail}
                      alt={mainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block px-3 py-1 bg-[#c41e3a] text-white text-[11px] font-semibold rounded-full mb-3 uppercase tracking-wide">
                        Nổi bật
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight drop-shadow-lg">
                        {mainArticle.title}
                      </h3>
                      <p className="text-sm text-white/90 line-clamp-2 drop-shadow">
                        {mainArticle.description}
                      </p>
                    </div>
                  </div>
                )}
              </Link>
            </article>

            {/* Sub articles in grid */}
            {subArticles.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-1">
                {subArticles.map((article) => (
                  <article key={article.id} className="group">
                    <Link
                      href={getLink(article.url)}
                      className="block"
                      {...linkProps}
                    >
                      {article.thumbnail && (
                        <div className="relative aspect-[16/10] mb-3 overflow-hidden rounded-lg shadow-sm">
                          <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="200px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      <h4 className="text-[14px] font-medium text-gray-700 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar list */}
          {listArticles.length > 0 && (
            <div className="lg:col-span-1 lg:border-l border-gray-100 lg:pl-5">
              <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-4">Tin khác</h3>
              <ul className="space-y-0">
                {listArticles.map((article, index) => (
                  <li
                    key={article.id}
                    className={`py-3 ${index !== listArticles.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <Link
                      href={getLink(article.url)}
                      className="text-[14px] text-gray-700 hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 block leading-snug font-medium"
                      {...linkProps}
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Variant: Standard - Main + sub grid (default)
  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden">
      <SectionHeader
        title={title}
        slug={slug}
        subMenus={subMenus}
        showSubMenus={subMenus.length > 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {/* Main article */}
        <div className="md:col-span-2">
          <article className="group">
            <Link
              href={getLink(mainArticle.url)}
              className="block"
              {...linkProps}
            >
              {mainArticle.thumbnail && (
                <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src={mainArticle.thumbnail}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <h3 className="text-[17px] font-bold text-gray-800 group-hover:text-[#c41e3a] transition-colors duration-200 mb-2 leading-snug">
                {mainArticle.title}
              </h3>
              <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                {mainArticle.description}
              </p>
            </Link>
          </article>
        </div>

        {/* Sub articles */}
        {subArticles.map((article) => (
          <article key={article.id} className="group">
            <Link href={getLink(article.url)} className="block" {...linkProps}>
              {article.thumbnail && (
                <div className="relative aspect-[16/10] mb-3 overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <h4 className="text-[14px] font-medium text-gray-700 group-hover:text-[#c41e3a] transition-colors duration-200 line-clamp-2 leading-snug">
                {article.title}
              </h4>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
