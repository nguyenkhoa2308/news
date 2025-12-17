"use client";

import { useState, useEffect } from "react";
import LatestNewsCard from "./LatestNewsCard";
import {
  postsAPI,
  normalizeArticles,
  type NormalizedArticle,
} from "@/lib/api-endpoints";

export default function LatestNewsSection() {
  const [articles, setArticles] = useState<NormalizedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postsAPI.getRecent(15);
        if (data) {
          setArticles(normalizeArticles(data));
        } else {
          setError("Không có dữ liệu");
        }
      } catch {
        setError("Không thể tải tin mới nhất");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#c41e3a]">
          Tin mới nhất
        </h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex gap-3">
                <div className="w-[120px] h-[80px] bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#c41e3a]">
          Tin mới nhất
        </h2>
        <p className="text-sm text-gray-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#c41e3a]">
        Tin mới nhất
      </h2>
      <div>
        {articles.map((article) => (
          <LatestNewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
