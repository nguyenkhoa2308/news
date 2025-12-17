"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCategories } from "@/stores/category-store";

function getCurrentDate() {
  const now = new Date();
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return `${day}, ${date}/${month}/${year}`;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate] = useState(getCurrentDate);
  const [searchOpen, setSearchOpen] = useState(false);
  const { categories } = useCategories();

  // const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  // const hiddenCategories = categories.slice(MAX_VISIBLE_CATEGORIES);
  // const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top bar - Date & Quick links */}
      <div className="bg-[#f8f8f8] border-b border-gray-200/80">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="flex items-center justify-between h-8 text-[12px]">
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {currentDate}
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Hà Nội
              </span>
              <span className="hidden sm:flex items-center gap-1 text-amber-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                26°C
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Link href="#" className="hover:text-[#c41e3a] transition-colors">
                Mới nhất
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="#" className="hover:text-[#c41e3a] transition-colors">
                Podcast
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="#"
                className="hover:text-[#c41e3a] transition-colors hidden sm:inline"
              >
                Video
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <Link href="#" className="hover:text-[#c41e3a] transition-colors">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Logo & Search */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center group h-[50px]">
              <Image
                width={180}
                height={50}
                src={"/images/logo.png"}
                alt="Logo"
                className="h-full w-auto object-contain"
                priority
              />
            </Link>

            {/* Tagline - center */}
            <div className="hidden lg:flex flex-col items-center">
              <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                Báo tiếng Việt nhiều người xem nhất
              </span>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                {searchOpen && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center animate-in slide-in-from-right-5 duration-200">
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="w-[200px] sm:w-[280px] h-10 pl-4 pr-10 text-[14px] border border-gray-200 rounded-full focus:outline-none focus:border-[#c41e3a] focus:ring-2 focus:ring-red-100 transition-all"
                      autoFocus
                    />
                  </div>
                )}
                <button
                  type="button"
                  title="Tìm kiếm"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                    searchOpen
                      ? "bg-[#c41e3a] text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#c41e3a]"
                  }`}
                >
                  {searchOpen ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Notification */}
              <button
                type="button"
                title="Thông báo"
                className="hidden md:flex w-10 h-10 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#c41e3a] rounded-full transition-all relative"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#c41e3a] rounded-full ring-2 ring-white"></span>
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                title="Menu"
                className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#c41e3a] rounded-full transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto px-4 max-w-[1700px]">
          <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:items-center md:justify-center py-1 md:py-0">
              {/* Home icon */}
              <li className="hidden md:block">
                <Link
                  href="/"
                  className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#c41e3a] hover:bg-red-50 rounded-lg transition-all group"
                >
                  <svg
                    className="w-[18px] h-[18px] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
              </li>

              {/* Vertical divider */}
              <li className="hidden md:block">
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
              </li>

              {categories.map((cat, index) => (
                <li key={cat.slug || index}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex items-center px-3 py-3 md:py-2.5 text-[14px] md:text-[13px] text-gray-700 hover:text-[#c41e3a] transition-all font-medium relative group border-b md:border-0 border-gray-100"
                  >
                    <span className="relative">
                      {cat.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c41e3a] group-hover:w-full transition-all duration-300 ease-out"></span>
                    </span>
                  </Link>
                </li>
              ))}

              {/* More dropdown */}
              {/* {hiddenCategories.length > 0 && (
                <li className="relative">
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="flex items-center gap-1 px-3 py-3 md:py-2.5 text-[14px] md:text-[13px] text-gray-700 hover:text-[#c41e3a] transition-all font-medium w-full md:w-auto"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <span>Thêm</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isMoreOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMoreOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsMoreOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[280px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 gap-0.5 px-2">
                          {hiddenCategories.map((cat) => (
                            <Link
                              key={cat._id}
                              href={`/category/${cat.slug}`}
                              className="block px-3 py-2.5 text-[13px] text-gray-700 hover:text-[#c41e3a] hover:bg-red-50 rounded-lg transition-all"
                              onClick={() => setIsMoreOpen(false)}
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </li>
              )} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
