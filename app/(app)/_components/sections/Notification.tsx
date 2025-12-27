"use client"

import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { CalendarDays, ChevronRight } from "lucide-react"

type Post = {
  id: string
  type: "notice" | "news"
  title: string
  excerpt: string
  dateText: string
  image: string
  href: string
}

export default function NoticeNewsGreen() {
  const [tab, setTab] = useState<"notice" | "news">("notice")

  // ✅ thay bằng data thật (API) sau
  const posts: Post[] = useMemo(
    () => [
      {
        id: "1",
        type: "notice",
        title: "Thông báo các khoản thu đầu năm học 2025-2026",
        excerpt:
          "Để chuẩn bị tốt cho năm học 2025-2026, nhà trường xin kính báo đến các bậc phụ huynh...",
        dateText: "Thứ 5, 26/09/24 lúc 07:47",
        image: "/images/notice-cover.jpg",
        href: "/thong-bao/1",
      },
      {
        id: "2",
        type: "notice",
        title: "Thông báo tuyển sinh năm học 2025-2026",
        excerpt:
          "Căn cứ kế hoạch phát triển Giáo dục năm học 2025-2026 của Phòng Giáo dục-Đào tạo...",
        dateText: "Thứ 5, 26/09/24 lúc 07:11",
        image: "/images/notice-cover.jpg",
        href: "/thong-bao/2",
      },
      {
        id: "3",
        type: "news",
        title: "Bí quyết giúp bé tự tin khi đến lớp",
        excerpt:
          "Một vài mẹo nhỏ giúp con thích nghi môi trường mới, kết nối bạn bè và vui học mỗi ngày...",
        dateText: "Thứ 3, 10/10/24 lúc 09:20",
        image: "/images/news-cover.jpg",
        href: "/tin-tuc/3",
      },
      {
        id: "4",
        type: "news",
        title: "Gợi ý thực đơn dinh dưỡng cho bé mầm non",
        excerpt:
          "Dinh dưỡng cân bằng là nền tảng để bé phát triển khỏe mạnh, vui vẻ và tràn đầy năng lượng...",
        dateText: "Thứ 7, 12/10/24 lúc 08:05",
        image: "/images/news-cover.jpg",
        href: "/tin-tuc/4",
      },
    ],
    []
  )

  const filtered = posts.filter((p) => p.type === tab)

  return (
    <motion.section
      id="notice"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className="relative py-16 md:py-24 bg-[#f4fbf7] overflow-hidden"
    >
      {/* Decorative: dotted line */}
      <div className="absolute left-10 top-20 hidden md:block pointer-events-none opacity-60">
        <svg width="240" height="90" viewBox="0 0 240 90" fill="none">
          <path
            d="M12 48 C 44 24, 78 72, 112 48 C 146 24, 180 72, 228 48"
            stroke="#b7c7bf"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative giraffe corner (optional) */}
      <img
        src="/images/giraffe.png"
        alt=""
        className="absolute right-6 -top-6 w-24 opacity-90 pointer-events-none"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = "none"
        }}
      />

      {/* Bottom clouds */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
        <svg viewBox="0 0 1440 140" className="w-full h-[70px] md:h-[90px]">
          <path
            fill="#ffffff"
            d="M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,140L0,140Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-wide">
            Thông báo - Tin tức
          </h2>
          <p className="mt-3 text-slate-600">
            Thông báo của nhà trường, tin tức tổng hợp về giáo dục, y tế học đường và các phương pháp nuôi dạy trẻ.
          </p>

          {/* Tabs */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setTab("notice")}
              className={`
                px-8 py-3 rounded-xl font-bold border transition
                ${tab === "notice"
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}
              `}
            >
              Thông báo
            </button>

            <button
              type="button"
              onClick={() => setTab("news")}
              className={`
                px-8 py-3 rounded-xl font-bold border transition
                ${tab === "news"
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}
              `}
            >
              Tin tức
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.25 }}
                className="group rounded-2xl bg-white shadow-xl overflow-hidden border border-slate-100"
              >
                {/* image */}
                <div className="relative h-[240px] bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* subtle green overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* content */}
                <div className="p-6">
                  <div className="text-slate-500 text-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>Ngày đăng: {post.dateText}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-extrabold text-primary leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={post.href}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-90"
                    >
                      Xem chi tiết <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Optional: View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href={tab === "notice" ? "/thong-bao" : "/tin-tuc"}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white border border-primary/30 text-primary font-bold shadow-sm hover:bg-primary/5 transition"
          >
            Xem tất cả <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
