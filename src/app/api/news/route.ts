import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Article } from '@/types/news';

// Cache để tránh gọi lại quá nhiều
const cache = new Map<string, { data: Article[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

async function scrapeCategory(category: string): Promise<Article[]> {
  const cacheKey = category || 'home';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url = category
      ? `https://vnexpress.net/${category}`
      : 'https://vnexpress.net';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const articles: Article[] = [];
    const seenTitles = new Set<string>();

    // Cào tin topstory (tin nổi bật nhất)
    $('.article-topstory').each((index, element) => {
      const $el = $(element);
      const title = $el.find('.title-news a').text().trim();
      const link = $el.find('.title-news a').attr('href') || '';
      const description = $el.find('.description a').text().trim();
      const thumbnail = $el.find('picture img').attr('data-src') ||
                       $el.find('picture img').attr('src') ||
                       $el.find('img').attr('data-src') ||
                       $el.find('img').attr('src') || '';
      const time = $el.find('.time-ago').text().trim() || $el.find('.time').text().trim();

      if (title && link && !seenTitles.has(title)) {
        seenTitles.add(title);
        articles.push({
          id: `top-${index}-${Date.now()}`,
          title,
          description,
          thumbnail: thumbnail.startsWith('http') ? thumbnail : '',
          url: link,
          category: getCategoryName(category),
          publishedAt: time || new Date().toISOString(),
        });
      }
    });

    // Cào tin từ các section chính
    $('.item-news').each((index, element) => {
      const $el = $(element);
      const title = $el.find('.title-news a').text().trim();
      const link = $el.find('.title-news a').attr('href') || '';
      const description = $el.find('.description a').text().trim();
      const thumbnail = $el.find('picture img').attr('data-src') ||
                       $el.find('picture img').attr('src') ||
                       $el.find('img').attr('data-src') ||
                       $el.find('img').attr('src') || '';
      const categoryName = $el.find('.label-category').text().trim() || getCategoryName(category);
      const time = $el.find('.time-ago').text().trim() || $el.find('.time').text().trim();

      if (title && link && !seenTitles.has(title)) {
        seenTitles.add(title);
        articles.push({
          id: `article-${index}-${Date.now()}`,
          title,
          description,
          thumbnail: thumbnail.startsWith('http') ? thumbnail : '',
          url: link,
          category: categoryName,
          publishedAt: time || new Date().toISOString(),
        });
      }
    });

    // Cào tin từ sidebar hoặc other sections
    $('.item-news-common').each((index, element) => {
      const $el = $(element);
      const title = $el.find('.title-news a').text().trim();
      const link = $el.find('.title-news a').attr('href') || '';
      const description = $el.find('.description').text().trim();
      const thumbnail = $el.find('picture img').attr('data-src') ||
                       $el.find('picture img').attr('src') ||
                       $el.find('img').attr('data-src') ||
                       $el.find('img').attr('src') || '';
      const time = $el.find('.time-ago').text().trim();

      if (title && link && !seenTitles.has(title)) {
        seenTitles.add(title);
        articles.push({
          id: `common-${index}-${Date.now()}`,
          title,
          description,
          thumbnail: thumbnail.startsWith('http') ? thumbnail : '',
          url: link,
          category: getCategoryName(category),
          publishedAt: time || new Date().toISOString(),
        });
      }
    });

    // Cào thêm từ .list-news và .sub-news
    $('.sub-news .item-news, .list-news .item-news').each((index, element) => {
      const $el = $(element);
      const title = $el.find('.title-news a').first().text().trim();
      const link = $el.find('.title-news a').first().attr('href') || '';
      const thumbnail = $el.find('picture img').attr('data-src') ||
                       $el.find('img').attr('data-src') ||
                       $el.find('img').attr('src') || '';

      if (title && link && !seenTitles.has(title)) {
        seenTitles.add(title);
        articles.push({
          id: `sub-${index}-${Date.now()}`,
          title,
          description: '',
          thumbnail: thumbnail.startsWith('http') ? thumbnail : '',
          url: link,
          category: getCategoryName(category),
          publishedAt: new Date().toISOString(),
        });
      }
    });

    cache.set(cacheKey, { data: articles, timestamp: Date.now() });
    return articles;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}

function getCategoryName(slug: string): string {
  const categoryMap: Record<string, string> = {
    '': 'Tin mới nhất',
    'thoi-su': 'Thời sự',
    'goc-nhin': 'Góc nhìn',
    'the-gioi': 'Thế giới',
    'kinh-doanh': 'Kinh doanh',
    'bat-dong-san': 'Bất động sản',
    'khoa-hoc': 'Khoa học',
    'giai-tri': 'Giải trí',
    'the-thao': 'Thể thao',
    'phap-luat': 'Pháp luật',
    'giao-duc': 'Giáo dục',
    'suc-khoe': 'Sức khỏe',
    'doi-song': 'Đời sống',
    'du-lich': 'Du lịch',
    'so-hoa': 'Số hóa',
    'oto-xe-may': 'Xe',
    'y-kien': 'Ý kiến',
    'tam-su': 'Tâm sự',
  };
  return categoryMap[slug] || slug;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || '';
  const multi = searchParams.get('multi'); // Để lấy nhiều categories cùng lúc

  try {
    if (multi) {
      // Lấy tin từ nhiều categories cùng lúc
      const categories = multi.split(',');
      const results: Record<string, Article[]> = {};

      await Promise.all(
        categories.map(async (cat) => {
          const articles = await scrapeCategory(cat.trim());
          results[cat.trim() || 'home'] = articles.slice(0, 20);
        })
      );

      return NextResponse.json({
        success: true,
        data: results
      });
    }

    const articles = await scrapeCategory(category);

    return NextResponse.json({
      success: true,
      articles: articles.slice(0, 30),
      total: articles.length
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch news',
      articles: []
    }, { status: 500 });
  }
}
