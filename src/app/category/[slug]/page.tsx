'use client';

import { useState, useEffect, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { postsAPI, normalizeArticles, type NormalizedArticle } from '@/lib/api-endpoints';
import { useCategories } from '@/stores/category-store';
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
  'du-lich': ['Điểm đến', 'Ẩm thực', 'Dấu chân', 'Tư vấn'],
  'so-hoa': ['Công nghệ', 'Sản phẩm', 'Kinh nghiệm', 'Esports'],
  'oto-xe-may': ['Thị trường', 'Xe điện', 'Đánh giá', 'Tư vấn'],
  'giao-duc': ['Tin tức', 'Tuyển sinh', 'Du học', 'Chân dung'],
  'khoa-hoc': ['Tin tức', 'Phát minh', 'Ứng dụng', 'Thế giới tự nhiên'],
};

const toSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// article.url đã là /${slug} từ normalizeArticle

const getTimeAgo = (publishedAt: string) => {
  if (publishedAt.includes('trước') || publishedAt.includes('phút') || publishedAt.includes('giờ')) {
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
    return date.toLocaleDateString('vi-VN');
  }
  return publishedAt || 'Vừa xong';
};

interface Props {
  params: Promise<{ slug: string }>;
}

function CategoryContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get('sub');
  const { categories, getCategoryBySlug } = useCategories();
  const [articles, setArticles] = useState<NormalizedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const category = getCategoryBySlug(slug);
  const subMenus = categorySubMenus[slug] || [];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await postsAPI.getByCategory(slug, { limit: 20 });
        setArticles(normalizeArticles(data));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const listArticles = articles.slice(4);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto px-4 py-5 max-w-[1130px]">
        {/* Category Title + Sub-menu */}
        <div className="border-b border-[#c41e3a] pb-2 mb-5">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
            <Link href={`/category/${slug}`} className="text-2xl font-normal text-[#222]">
              {category?.name || slug}
            </Link>
            {subMenus.length > 0 && (
              <nav className="flex items-center gap-3 text-[14px]">
                {subMenus.map((sub) => {
                  const subSlug = toSlug(sub);
                  const isActive = activeSub === subSlug;
                  return (
                    <Link
                      key={sub}
                      href={`/category/${slug}?sub=${subSlug}`}
                      className={isActive ? 'text-[#c41e3a]' : 'text-[#757575] hover:text-[#c41e3a]'}
                    >
                      {sub}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : articles.length === 0 ? (
          <div className="py-10 text-center text-[#757575]">
            Không có tin tức nào trong chuyên mục này
          </div>
        ) : (
          <div className="flex gap-5">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Featured Section */}
              <div className="flex gap-5 pb-5 mb-5 border-b border-[#e5e5e5]">
                {/* Featured Article */}
                {featuredArticle && (
                  <div className="flex-1">
                    <Link href={featuredArticle.url} className="group block">
                      {featuredArticle.thumbnail && (
                        <div className="relative w-full aspect-[16/10] mb-3">
                          <Image
                            src={featuredArticle.thumbnail}
                            alt={featuredArticle.title}
                            fill
                            priority
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h2 className="text-[22px] font-normal text-[#222] leading-[1.4] mb-2 group-hover:text-[#c41e3a]">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-[14px] text-[#757575] leading-[1.6] line-clamp-3">
                        {featuredArticle.description}
                      </p>
                    </Link>
                  </div>
                )}

                {/* Side Articles */}
                <div className="w-[300px] flex-shrink-0 border-l border-[#e5e5e5] pl-5">
                  {sideArticles.map((article, idx) => (
                    <div key={article.id} className={idx < sideArticles.length - 1 ? 'mb-4 pb-4 border-b border-[#e5e5e5]' : ''}>
                      <Link href={article.url} className="group block">
                        <h3 className="text-[15px] font-normal text-[#222] leading-[1.4] mb-2 group-hover:text-[#c41e3a] line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[13px] text-[#757575] leading-[1.5] line-clamp-2">
                          {article.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* List Articles */}
              <div className="space-y-5">
                {listArticles.map((article) => (
                  <article key={article.id} className="flex gap-4 pb-5 border-b border-[#e5e5e5] last:border-b-0">
                    {article.thumbnail && (
                      <Link href={article.url} className="flex-shrink-0">
                        <div className="relative w-[200px] h-[120px]">
                          <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link href={article.url} className="group">
                        <h3 className="text-[18px] font-normal text-[#222] leading-[1.4] mb-2 group-hover:text-[#c41e3a]">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-[14px] text-[#757575] leading-[1.6] line-clamp-2 mb-2">
                        {article.description}
                      </p>
                      <span className="text-[12px] text-[#999]">{getTimeAgo(article.publishedAt)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-[300px] flex-shrink-0 border-l border-[#e5e5e5] pl-5">
              {/* Xem nhiều */}
              <div className="mb-6">
                <h2 className="text-[16px] font-bold text-[#222] pb-2 mb-4 border-b border-[#c41e3a]">
                  Xem nhiều
                </h2>
                {articles.slice(0, 5).map((article, index) => (
                  <div key={article.id} className={index < 4 ? 'mb-4 pb-4 border-b border-[#f0f0f0]' : ''}>
                    <Link
                      href={article.url}
                      className="flex gap-3 group"
                    >
                      <span className={`text-[20px] font-bold ${index < 3 ? 'text-[#c41e3a]' : 'text-[#999]'}`}>
                        {index + 1}
                      </span>
                      <span className="text-[14px] text-[#222] leading-[1.4] group-hover:text-[#c41e3a] line-clamp-2">
                        {article.title}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Chuyên mục khác */}
              <div className="sticky top-[160px]">
                <h2 className="text-[16px] font-bold text-[#222] pb-2 mb-4 border-b border-[#e5e5e5]">
                  Chuyên mục
                </h2>
                <ul className="space-y-2">
                  {categories
                    .filter((c) => c.slug !== slug)
                    .slice(0, 10)
                    .map((cat) => (
                      <li key={cat._id}>
                        <Link
                          href={`/category/${cat.slug}`}
                          className="text-[14px] text-[#222] hover:text-[#c41e3a]"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  return (
    <Suspense fallback={<CategoryLoadingFallback />}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}

function CategoryLoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto px-4 py-5 max-w-[1130px]">
        <div className="h-8 w-40 bg-gray-100 mb-5"></div>
        <LoadingSkeleton />
      </main>
      <Footer />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex gap-5">
      <div className="flex-1">
        <div className="flex gap-5 pb-5 mb-5 border-b border-[#e5e5e5]">
          <div className="flex-1">
            <div className="aspect-[16/10] bg-gray-100 mb-3"></div>
            <div className="h-6 bg-gray-100 mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-100 w-full"></div>
          </div>
          <div className="w-[300px] border-l border-[#e5e5e5] pl-5 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pb-4 border-b border-[#e5e5e5]">
                <div className="h-4 bg-gray-100 mb-2"></div>
                <div className="h-3 bg-gray-100 w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 pb-5 border-b border-[#e5e5e5]">
              <div className="w-[200px] h-[120px] bg-gray-100"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-100 mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-100 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[300px] border-l border-[#e5e5e5] pl-5">
        <div className="h-5 bg-gray-100 w-24 mb-4"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 mb-4 pb-4 border-b border-[#f0f0f0]">
            <div className="w-6 h-6 bg-gray-100"></div>
            <div className="flex-1 h-4 bg-gray-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
