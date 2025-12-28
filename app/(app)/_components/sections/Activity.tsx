"use client"

import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, X } from "lucide-react"
import Image from "next/image"

type VideoItem = {
  id: string
  title: string
  dateText: string
  thumbnail: string
  youtubeId: string
}

function VideoModal({
  open,
  onClose,
  youtubeId,
  title,
}: {
  open: boolean
  onClose: () => void
  youtubeId: string
  title: string
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-bold text-slate-800 line-clamp-1">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedActivities() {
  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        title: "Cùng bé khám phá Lễ hội Trăng Rằm",
        dateText: "Thứ 3, 28/10/25 lúc 08:44",
        thumbnail: "/assets/images/feat-1.jpg",
        youtubeId: "jNPglNNlw88",
      },
      {
        id: "2",
        title: 'TRÚC XINH "NHỮNG NỐT NHẠC VUI"',
        dateText: "Thứ 5, 11/09/25 lúc 14:05",
        thumbnail: "/assets/images/feat-2.jpg",
        youtubeId: "jNPglNNlw88",
      },
      {
        id: "3",
        title: "Lễ khai giảng năm học mới 2025 - 2026",
        dateText: "Thứ 2, 08/09/25 lúc 14:29",
        thumbnail: "/assets/images/feat-3.jpg",
        youtubeId: "jNPglNNlw88",
      },
      {
        id: "4",
        title: "Bé vui ngày hội - Hoạt động trải nghiệm",
        dateText: "Thứ 6, 15/11/25 lúc 09:10",
        thumbnail: "/assets/images/feat-4.jpg",
        youtubeId: "jNPglNNlw88",
      },
      {
        id: "5",
        title: "Một ngày ở Trúc Xinh: Chơi mà học",
        dateText: "Thứ 7, 23/11/25 lúc 10:20",
        thumbnail: "/assets/images/feat-5.jpg",
        youtubeId: "jNPglNNlw88",
      },
      {
        id: "6",
        title: "Góc nghệ thuật: Sắc màu tuổi thơ",
        dateText: "Chủ nhật, 01/12/25 lúc 16:00",
        thumbnail: "/assets/images/feat-6.jpg",
        youtubeId: "jNPglNNlw88",
      },
    ],
    []
  )

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<VideoItem | null>(null)

  const onOpen = (v: VideoItem) => {
    setActive(v)
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setActive(null)
  }

  return (
    <>
      <motion.section
        id="featured"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-16 md:py-24 bg-white"
      >
        {/* doodle góc phải */}
        <div className="absolute right-6 top-6 hidden md:block pointer-events-none opacity-40">
          <svg width="120" height="120" viewBox="0 0 110 110" fill="none">
            <path
              d="M22 40 C 35 18, 58 18, 68 34 C 78 50, 62 64, 46 58"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
            <path
              d="M62 64 C 74 58, 88 68, 86 82 C 84 96, 66 98, 58 88"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          {/* Heading giống screenshot (giữ nguyên màu text-primary) */}
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-extrabold text-primary"
              style={{ fontFamily: "'Baloo 2', system-ui, sans-serif" }}
            >
              Hoạt động nổi bật
            </h2>
            <p className="mt-2 text-slate-500 text-sm md:text-base">
              Những khoảnh khắc hoạt động của bé, kỷ ức về tuổi thơ tại trường Trúc Xinh
            </p>
          </div>

          {/* Grid giống screenshot: card nhẹ, khoảng cách thoáng */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {videos.map((v) => (
                <motion.article
                  key={v.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <button
                    type="button"
                    onClick={() => onOpen(v)}
                    className="relative w-full h-[210px] bg-slate-100"
                    aria-label={`Play ${v.title}`}
                  >
                    <Image
                      width={100} height={100}
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />

                    {/* nút play tròn đơn giản như screenshot (giữ màu xanh emerald) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-emerald-600 ml-0.5" />
                      </div>
                    </div>
                  </button>

                  {/* Nội dung */}
                  <div className="p-5">
                    <div className="bg-slate-50 rounded-xl px-3 py-2 text-slate-500 text-xs md:text-sm">
                      Ngày đăng: {v.dateText}
                    </div>

                    <h3
                      className="mt-3 text-[15px] md:text-base font-bold leading-snug line-clamp-2 text-emerald-600"
                      style={{ fontFamily: "'Baloo 2', system-ui, sans-serif" }}
                    >
                      {v.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <VideoModal
        open={open}
        onClose={onClose}
        youtubeId={active?.youtubeId ?? ""}
        title={active?.title ?? ""}
      />
    </>
  )
}
