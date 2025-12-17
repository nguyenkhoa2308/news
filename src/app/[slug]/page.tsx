"use client";

import React, { useState, useEffect, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  postsAPI,
  type Article,
  type ContentSection,
  type TocItem,
} from "@/lib/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

// Mock comments
interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

const mockComments: Comment[] = [
  { id: "1", author: "Nguyễn Văn A", content: "Bài viết rất hay và chi tiết!", createdAt: "2 giờ trước", likes: 15 },
  { id: "2", author: "Trần Thị B", content: "Thông tin hữu ích, cảm ơn tác giả.", createdAt: "3 giờ trước", likes: 8 },
  { id: "3", author: "Lê Văn C", content: "Tôi đã áp dụng và thấy hiệu quả.", createdAt: "5 giờ trước", likes: 12 },
  { id: "4", author: "Phạm Thị D", content: "Nội dung chất lượng.", createdAt: "1 ngày trước", likes: 5 },
  { id: "5", author: "Hoàng Văn E", content: "Mong tác giả viết thêm.", createdAt: "1 ngày trước", likes: 3 },
];

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const getTimeAgo = (publishedAt: string) => {
  const date = new Date(publishedAt);
  if (isNaN(date.getTime())) return publishedAt;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours}h trước`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return date.toLocaleDateString("vi-VN");
};

// Render a single content section
function RenderSection({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "heading":
      const HeadingTag = `h${
        section.level || 2
      }` as keyof React.JSX.IntrinsicElements;
      const headingClasses =
        section.level === 2
          ? "text-[22px] font-bold text-[#222] mt-8 mb-4"
          : "text-[18px] font-bold text-[#222] mt-6 mb-3";
      return (
        <HeadingTag id={section.anchor} className={headingClasses}>
          {section.text}
        </HeadingTag>
      );

    case "paragraph":
      return (
        <div className="article-paragraph mb-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-[18px] text-[#222] leading-[1.8] mb-4">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#c41e3a] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              h1: ({ children }) => (
                <h1 className="text-[26px] font-bold text-[#222] mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-[22px] font-bold text-[#222] mt-8 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-[18px] font-bold text-[#222] mt-6 mb-3">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-[18px] text-[#222] leading-[1.6]">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-3 border-[#c41e3a] pl-4 my-6 italic text-[#555]">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-[#e5e5e5] px-4 py-2 bg-[#f5f5f5] font-bold text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-[#e5e5e5] px-4 py-2">
                  {children}
                </td>
              ),
            }}
          >
            {section.content || ""}
          </ReactMarkdown>
        </div>
      );

    case "list":
      if (!section.list) return null;
      const ListTag = section.list.type === "ordered" ? "ol" : "ul";
      const listClass =
        section.list.type === "ordered"
          ? "list-decimal pl-6 mb-4 space-y-2"
          : "list-disc pl-6 mb-4 space-y-2";
      return (
        <ListTag className={listClass}>
          {section.list.items.map((item, idx) => (
            <li key={idx} className="text-[18px] text-[#222] leading-[1.6]">
              {item}
            </li>
          ))}
        </ListTag>
      );

    case "image":
      return (
        <figure className="my-6">
          {section.src && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={section.src}
                alt={section.alt || ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          {section.caption && (
            <figcaption className="text-center text-[14px] text-[#757575] mt-2">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="border-l-3 border-[#c41e3a] pl-4 my-6 italic text-[#555] text-[18px] leading-[1.8]">
          {section.content}
        </blockquote>
      );

    default:
      return null;
  }
}

// Inline Table of Contents - displayed within article content
function InlineTableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc || toc.length === 0) return null;

  return (
    <div className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-lg p-5 mb-8">
      <h3 className="text-[16px] font-bold text-[#222] mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#c41e3a]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        Mục lục bài viết
      </h3>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={item.id} className={`${item.level === 3 ? "pl-6" : ""}`}>
            <a
              href={`#${item.anchor}`}
              className="text-[15px] text-[#333] hover:text-[#c41e3a] transition-colors flex items-start gap-2 py-1"
            >
              <span className="text-[#c41e3a] font-medium min-w-[20px]">
                {item.level === 2 ? `${index + 1}.` : "•"}
              </span>
              <span className="hover:underline">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ArticlePage({ params }: Props) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await postsAPI.getBySlug(slug);
        setArticle(data);

        // Fetch related articles from same category
        if (data.category?.slug) {
          const { data: related } = await postsAPI.getByCategory(
            data.category.slug,
            { limit: 5 }
          );
          setRelatedArticles(
            related.filter((a: Article) => a.slug !== slug).slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError("Không tìm thấy bài viết");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="mx-auto px-4 py-6 max-w-5xl">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-100 w-32 mb-4"></div>
            <div className="h-8 bg-gray-100 w-full mb-2"></div>
            <div className="h-8 bg-gray-100 w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-100 w-full mb-6"></div>
            <div className="aspect-[16/9] bg-gray-100 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-100 w-full"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="mx-auto px-4 py-20 max-w-5xl text-center">
          <h1 className="text-2xl text-gray-600 mb-4">
            {error || "Không tìm thấy bài viết"}
          </h1>
          <Link href="/" className="text-[#c41e3a] hover:underline">
            Quay về trang chủ
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const { contentStructure } = article;
  const hasToc = contentStructure?.toc && contentStructure.toc.length > 0;
  const hasSections =
    contentStructure?.sections && contentStructure.sections.length > 0;

  const displayedComments = showAllComments ? mockComments : mockComments.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Article Section - Background #fcfaf6 */}
      <div className="bg-[#fcfaf6] border-b border-[#e0e0e0]">
        <div className="mx-auto px-4 py-6 max-w-[1130px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-[#757575] mb-3">
            <Link href="/" className="hover:text-[#c41e3a]">
              Trang chủ
            </Link>
            <span>/</span>
            {article.category && (
              <>
                <Link
                  href={`/category/${article.category.slug}`}
                  className="hover:text-[#c41e3a]"
                >
                  {article.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#222] line-clamp-1 max-w-[300px]">
              {article.title}
            </span>
          </nav>

          <div className="flex gap-6">
            {/* Main Article */}
            <article className="flex-1 min-w-0">
          {/* Title */}
          <h1 className="text-[28px] font-normal text-[#222] leading-[1.3] mt-2 mb-3">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-[18px] text-[#555] leading-[1.5] mb-4">
              {article.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p className="text-[18px] font-bold text-[#222] leading-[1.6] mb-4">
            {article.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#757575] mb-5 pb-4 border-b border-[#e5e5e5]">
            {article.author && <span>{article.author}</span>}
            <span>{formatDate(article.publishedAt)}</span>
            {(article.readingTime || contentStructure?.estimatedReadTime) && (
              <span>
                {article.readingTime || contentStructure?.estimatedReadTime}{" "}
                phút đọc
              </span>
            )}
            {contentStructure?.wordCount && (
              <span>{contentStructure.wordCount} từ</span>
            )}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <figure className="mb-6">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </figure>
          )}

          {/* Inline Table of Contents */}
          {hasToc && <InlineTableOfContents toc={contentStructure!.toc} />}

          {/* Content */}
          <div className="article-content">
            {hasSections ? (
              contentStructure!.sections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <RenderSection key={section.id} section={section} />
                ))
            ) : article.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="text-[18px] text-[#222] leading-[1.8] mb-4">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-[26px] font-bold text-[#222] mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-[22px] font-bold text-[#222] mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-[18px] font-bold text-[#222] mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[18px] text-[#222] leading-[1.6]">
                      {children}
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-[#c41e3a] hover:underline">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-3 border-[#c41e3a] pl-4 my-6 italic text-[#555]">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-[#e5e5e5] px-4 py-2 bg-[#f5f5f5] font-bold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-[#e5e5e5] px-4 py-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            ) : null}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-6 flex items-center gap-2 text-[14px]">
                  <span className="text-[#999]">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <span key={tag} className="flex items-center gap-2">
                      <Link
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-[#333] hover:text-[#c41e3a]"
                      >
                        {tag}
                      </Link>
                      {index < article.tags!.length - 1 && <span className="text-[#ccc]">/</span>}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="w-[300px] flex-shrink-0 hidden lg:block">
              <div className="sticky top-[160px]">
                {/* Xem nhiều */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h2 className="text-[18px] font-bold text-[#222] pb-2 mb-4 border-b-2 border-[#c41e3a]">
                      Xem nhiều
                    </h2>
                    <div className="space-y-4">
                      {relatedArticles.slice(0, 5).map((item) => (
                        <Link
                          key={item._id || item.id}
                          href={`/${item.slug}`}
                          className="flex gap-3 group"
                        >
                          {item.coverImage && (
                            <div className="relative w-[100px] h-[60px] flex-shrink-0">
                              <Image
                                src={item.coverImage}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span className="text-[15px] text-[#333] leading-[1.4] group-hover:text-[#c41e3a] line-clamp-3">
                            {item.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Comments & Related Section - White background */}
      <div className="bg-white">
        <div className="mx-auto px-4 py-8 max-w-[1130px]">
          <div className="max-w-[760px]">
            {/* Comments Section */}
            <section className="mb-8">
              <h2 className="text-[18px] font-bold text-[#222] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ý kiến ({mockComments.length})
              </h2>

              <div className="space-y-4">
                {displayedComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 pb-4 border-b border-[#f0f0f0] last:border-b-0">
                    <div className="w-10 h-10 rounded-full bg-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-[#666]">{comment.author.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-bold text-[#222]">{comment.author}</span>
                        <span className="text-[12px] text-[#999]">{comment.createdAt}</span>
                      </div>
                      <p className="text-[14px] text-[#333] leading-[1.5]">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button type="button" className="flex items-center gap-1 text-[12px] text-[#666] hover:text-[#c41e3a]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {comment.likes}
                        </button>
                        <button type="button" className="text-[12px] text-[#666] hover:text-[#c41e3a]">Trả lời</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mockComments.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="mt-4 w-full py-2 text-[14px] text-[#c41e3a] border border-[#c41e3a] rounded hover:bg-[#c41e3a] hover:text-white transition-colors"
                >
                  {showAllComments ? "Thu gọn" : `Xem thêm ${mockComments.length - 3} ý kiến`}
                </button>
              )}
            </section>

            {/* Related Articles */}
            {relatedArticles.length > 0 && article.category && (
              <section className="pt-6 border-t border-[#e5e5e5]">
                <h2 className="text-[20px] font-bold text-[#222] mb-5 pb-2 border-l-4 border-[#c41e3a] pl-3">
                  {article.category.name}
                </h2>
                <div className="space-y-5">
                  {relatedArticles.map((item) => (
                    <article key={item._id || item.id} className="flex gap-4">
                      {item.coverImage && (
                        <Link href={`/${item.slug}`} className="flex-shrink-0">
                          <div className="relative w-[200px] h-[130px]">
                            <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                          </div>
                        </Link>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link href={`/${item.slug}`} className="group">
                          <h3 className="text-[18px] font-semibold text-[#222] leading-[1.4] mb-2 group-hover:text-[#c41e3a]">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-[14px] text-[#666] leading-[1.6] line-clamp-2 mb-2">{item.excerpt}</p>
                        <div className="flex items-center gap-3 text-[13px] text-[#999]">
                          <span>{getTimeAgo(item.publishedAt)}</span>
                          <Link href={`/category/${article.category!.slug}`} className="text-[#c41e3a]">
                            {article.category!.name}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
