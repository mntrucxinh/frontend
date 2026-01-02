"use client";

import Image from "@/components/Image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react"

import { newsData } from "./mock";

const ITEMS_PER_PAGE = 6;

const Breadcrumb = () => {
  return (
    <nav className="container mx-auto px-4 py-5 bg-white">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          {/* Assuming a parent page exists, otherwise this can be text */}
          <span className="font-medium text-gray-500">Tin tức</span>
        </li>
      </ol>
    </nav>
  )
}

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {
    return newsData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      <Breadcrumb />
      {/* Hero Section */}
      <section className="flex-1 bg-green-50 pt-12 pb-20">
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Tin Tức</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Tìm kiếm tin tức..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedNews.map((newsItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`/news/detail/${newsItem.slug}`}>
                <div className="relative h-56">
                  <Image
                    src={newsItem.thumbnail}
                    alt={newsItem.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  <Link href={`/news/detail/${newsItem.slug}`}>
                    {newsItem.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {newsItem.shortDescription}
                </p>
                <Link href={`/news/detail/${newsItem.slug}`}>
                  <div className="text-green-600 hover:text-green-700 font-semibold">
                    Xem thêm
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Không tìm thấy tin tức nào.</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Trang tiếp
            </button>
          </div>
        )}
      </div>
      </section>
      
    </div>
  );
};

export default NewsPage;