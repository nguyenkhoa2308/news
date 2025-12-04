'use client';

import Link from 'next/link';
import { categories } from '@/types/news';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    setCurrentDate(`${day}, ${date}/${month}/${year}`);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Logo & Top bar */}
      <div className="border-b border-gray-200 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center group transition-transform hover:scale-105">
                <svg viewBox="0 0 436 36" className="h-[28px] w-auto fill-[#c92a2a] transition-all group-hover:fill-[#a61e1e]">
                  <path d="M50.4 0h10.8L45.6 36H34.8l-6-21.6L22.2 36H11.4L0 0h10.8l6.6 22.8L24 0h10.8l6.6 22.8L50.4 0zm45.6 0v36h-9V12.6L78.6 36H72L63.6 12.6V36h-9V0h12l8.4 20.4L83.4 0h12.6zm58.2 0v36h-33V0h33zm-24 27h15V9h-15v18zm66.6 0v9h-33V0h33v9h-24v5.4h21v8.4h-21V27h24zm36.6 9L223.8 21l9.6-21h11.4l-10.2 19.2 12 16.8h-13.8zm-18.6 0V0h10.2v36h-10.2zm28.8-18c0-10.2 8.4-18.6 19.2-18.6h.6c6.6 0 11.4 2.4 14.4 6V0H288v18c0 10.2-8.4 18.6-19.2 18.6h-.6c-10.2 0-18.6-8.4-18.6-18.6zm10.2 0c0 5.4 4.2 9.6 9 9.6 5.4 0 9.6-4.2 9.6-9.6 0-5.4-4.2-9.6-9.6-9.6-4.8 0-9 4.2-9 9.6zm69 9v9h-33V0h33v9h-24v5.4h21v8.4h-21V27h24zm37.8-12.6c0 5.4-2.4 9-6 10.8L385.2 36h-12l-9-9.6h-7.8V36h-10.2V0h22.2c10.8 0 16.2 5.4 16.2 14.4zm-10.2 0c0-3.6-2.4-5.4-6.6-5.4h-11.4v10.8h11.4c4.2 0 6.6-1.8 6.6-5.4zm57 4.2c0 10.8-7.8 17.4-19.8 17.4h-21V0h21c12 0 19.8 6.6 19.8 18.6zm-10.2 0c0-6.6-4.2-9.6-10.2-9.6h-10.2v19.2h10.2c6 0 10.2-3 10.2-9.6z"/>
                </svg>
              </Link>
              <span className="text-[13px] text-gray-600 hidden sm:block font-medium">Báo tiếng Việt nhiều người xem nhất</span>
            </div>

            {/* Location & Weather */}
            <div className="flex items-center gap-5">
              <div className="hidden md:flex items-center gap-3 text-[13px] text-gray-700 font-medium">
                <span className="flex items-center gap-1.5 bg-gray-100/80 px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Hà Nội</span>
                </span>
                <span className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full text-amber-900">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  26°C
                </span>
              </div>
              <span className="text-[13px] text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-full">{currentDate}</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link href="#" className="text-[13px] text-gray-700 hover:text-[#c92a2a] hidden md:block font-medium px-3 py-1.5 rounded-full hover:bg-red-50 transition-all">Mới nhất</Link>
              <Link href="#" className="text-[13px] text-gray-700 hover:text-[#c92a2a] hidden md:block font-medium px-3 py-1.5 rounded-full hover:bg-red-50 transition-all">Địa phương</Link>
              <button type="button" title="Tìm kiếm" className="p-2.5 text-gray-600 hover:text-[#c92a2a] hover:bg-red-50 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button type="button" title="Thông báo" className="p-2.5 text-gray-600 hover:text-[#c92a2a] hover:bg-red-50 rounded-full transition-all hidden md:block relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c92a2a] rounded-full ring-2 ring-white"></span>
              </button>
              <Link href="#" className="text-[13px] text-gray-700 hover:text-[#c92a2a] hidden md:block font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-red-100/50 hover:from-red-100 hover:to-red-200/50 transition-all">Đăng nhập</Link>
              {/* Mobile menu button */}
              <button
                type="button"
                title="Menu"
                className="md:hidden p-2.5 text-gray-600 hover:text-[#c92a2a] hover:bg-red-50 rounded-full transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white ${isMenuOpen ? 'block' : 'hidden'} md:block border-b border-gray-100`}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center overflow-x-auto scrollbar-hide gap-1">
            {/* Home icon */}
            <li>
              <Link href="/" className="flex items-center justify-center w-[44px] h-[44px] text-gray-700 hover:text-[#c92a2a] hover:bg-red-50 rounded-lg transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-2.5 text-[14px] whitespace-nowrap text-gray-700 hover:text-[#c92a2a] hover:bg-red-50 rounded-lg transition-all font-medium relative group"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#c92a2a] group-hover:w-2/3 transition-all duration-300"></span>
                </Link>
              </li>
            ))}
            <li>
              <button type="button" title="Thêm chuyên mục" className="flex items-center justify-center w-[44px] h-[44px] text-gray-500 hover:text-[#c92a2a] hover:bg-red-50 rounded-lg transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
