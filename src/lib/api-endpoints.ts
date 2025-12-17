import api from "./api";

// ============================================
// Types
// ============================================

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  viewCount?: number;
}

// Content structure types
export interface TocItem {
  id: string;
  text: string;
  level: number;
  anchor: string;
}

export interface ContentSection {
  id: string;
  type: "paragraph" | "heading" | "list" | "image" | "quote" | "table";
  order: number;
  content?: string;
  level?: number;
  text?: string;
  anchor?: string;
  list?: {
    type: "ordered" | "unordered";
    items: string[];
  };
  src?: string;
  alt?: string;
  caption?: string;
}

export interface ContentStructure {
  summary: string;
  toc: TocItem[];
  sections: ContentSection[];
  wordCount: number;
  estimatedReadTime: number;
  lastStructureUpdate: string;
}

export interface Article {
  _id: string;
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  categoryId: string;
  status?: "draft" | "published" | "archived";
  publishedAt: string;
  viewCount?: number;
  author?: string;
  tags?: string[];
  isFeatured?: boolean;
  readingTime?: number;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
  contentStructure?: ContentStructure;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string | null;
}

export interface NormalizedArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string;
  publishedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Normalize functions
// ============================================

export function normalizeArticle(article: Article): NormalizedArticle {
  return {
    id: article._id || article.id,
    title: article.title,
    slug: article.slug,
    description: article.excerpt || "",
    thumbnail: article.coverImage || "",
    url: `/${article.slug}`,
    category: article.category?.name || "",
    publishedAt: article.publishedAt,
  };
}

export function normalizeArticles(articles: Article[]): NormalizedArticle[] {
  return articles.map(normalizeArticle);
}

// ============================================
// API Services (returns unwrapped data)
// ============================================

export const categoryApi = {
  getAll: async () => (await api.get<Category[]>("/api/categories")).data,
  getBySlug: async (slug: string) =>
    (await api.get<Category>(`/api/categories/${slug}`)).data,
  getById: async (id: string) =>
    (await api.get<Category>(`/api/categories/${id}`)).data,
};

export const postsAPI = {
  getAll: async (params?: {
    category?: string;
    limit?: number;
    page?: number;
  }) =>
    (await api.get<PaginatedResponse<Article>>("/api/posts", { params })).data,

  getBySlug: async (slug: string) =>
    (await api.get<Article>(`/api/posts/slug/${slug}`)).data,

  getByCategory: async (categorySlug: string, params?: { limit?: number }) =>
    (
      await api.get<PaginatedResponse<Article>>(
        `/api/posts/category/${categorySlug}`,
        { params }
      )
    ).data,

  getRecent: async (limit: number = 15) => {
    const response = await api.get<Article[]>("/api/posts/recent", {
      params: { limit },
    });
    return response.data;
  },
};
