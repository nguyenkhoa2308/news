'use client';

import { create } from 'zustand';
import { categoryApi, type Category } from '@/lib/api-endpoints';

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getCategoryById: (id: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: true,
  error: null,
  hasFetched: false,

  fetchCategories: async () => {
    if (get().hasFetched) return;

    set({ isLoading: true, hasFetched: true });
    try {
      const data = await categoryApi.getAll();
      set({ categories: data, error: null, isLoading: false });
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      set({ error: 'Failed to load categories', isLoading: false });
    }
  },

  getCategoryBySlug: (slug: string) => {
    return get().categories.find(cat => cat.slug === slug);
  },

  getCategoryById: (id: string) => {
    return get().categories.find(cat => cat._id === id);
  },
}));

// Hook tương thích với code cũ
export function useCategories() {
  const store = useCategoryStore();

  // Auto-fetch khi chưa có data
  if (!store.hasFetched) {
    store.fetchCategories();
  }

  return {
    categories: store.categories,
    isLoading: store.isLoading,
    error: store.error,
    getCategoryBySlug: store.getCategoryBySlug,
    getCategoryById: store.getCategoryById,
  };
}
