"use client"

import React, { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

type AgeKey = "2-3" | "3-4" | "4-5" | "5-6"

type Program = {
  key: AgeKey
  label: string
  badge: string
  img: string
  activities: string[]
  schedule: { time: string; text: string }[]
}

export default function ActivitiesAtSchool() {
  const programs: Program[] = useMemo(
    () => [
      {
        key: "2-3",
        label: "2-3 tuổi",
        badge: "2-3 tuổi",
        img: "/assets/images/activities-23.jpg",
        activities: [
          "Lễ giáo",
          "Làm quen môi trường lớp",
          "Vận động – trò chơi",
          "Âm nhạc – múa",
          "Góc chơi – góc học",
          "Tạo hình đơn giản",
          "Thói quen vệ sinh – tự phục vụ",
          "Trải nghiệm thiên nhiên",
        ],
        schedule: [
          { time: "6h30-8h00", text: "Đón trẻ – hoạt động tự chọn" },
          { time: "8h00-8h30", text: "Ăn sáng – vệ sinh" },
          { time: "8h30-9h10", text: "Hoạt động học nhẹ nhàng" },
          { time: "9h10-9h40", text: "Hoạt động nhóm – trò chơi" },
          { time: "9h40-10h10", text: "Hoạt động ngoài trời" },
          { time: "10h10-11h10", text: "Vệ sinh – ăn trưa" },
          { time: "11h10-14h00", text: "Ngủ trưa" },
          { time: "14h00-15h30", text: "Ăn bữa phụ – hoạt động chiều" },
          { time: "15h30-17h00", text: "Chơi tự chọn – trả trẻ" },
        ],
      },
      {
        key: "3-4",
        label: "3-4 tuổi",
        badge: "3-4 tuổi",
        img: "/assets/images/activities-34.jpg",
        activities: [
          "Lễ giáo",
          "Khám phá khoa học",
          "Âm nhạc – múa",
          "Làm quen văn học",
          "Vận động – thể chất",
          "Tạo hình",
          "Kỹ năng sống",
          "Trải nghiệm thiên nhiên",
        ],
        schedule: [
          { time: "6h30-8h00", text: "Đón trẻ – hoạt động tự chọn" },
          { time: "8h00-8h50", text: "Hoạt động học" },
          { time: "8h50-9h30", text: "Hoạt động nhóm" },
          { time: "9h30-10h10", text: "Hoạt động ngoài trời" },
          { time: "10h10-11h10", text: "Vệ sinh – ăn trưa" },
          { time: "11h10-14h00", text: "Ngủ trưa" },
          { time: "14h00-14h40", text: "Vệ sinh – ăn bữa phụ" },
          { time: "14h40-15h40", text: "Chơi – hoạt động tự chọn" },
          { time: "15h40-17h00", text: "Trả trẻ" },
        ],
      },
      {
        key: "4-5",
        label: "4-5 tuổi",
        badge: "4-5 tuổi",
        img: "/assets/images/activities-45.jpg",
        activities: [
          "Lễ giáo",
          "Khám phá khoa học",
          "Trải nghiệm âm nhạc - Múa",
          "Làm quen Văn học, Chữ viết",
          "Thể dục - Chăm sóc sức khoẻ",
          "Tạo hình",
          "Làm quen với Toán",
          "Làm quen tiếng Anh",
          "Erobic",
          "Bơi",
          "Trải nghiệm tự nhiên",
        ],
        schedule: [
          { time: "6h30-8h00", text: "Đón trẻ – hoạt động tự chọn" },
          { time: "8h00-8h50", text: "Hoạt động học" },
          { time: "8h50-9h30", text: "Hoạt động nhóm" },
          { time: "9h30-10h10", text: "Hoạt động ngoài trời" },
          { time: "10h10-11h10", text: "Vệ sinh - Ăn trưa" },
          { time: "11h10-14h00", text: "Ngủ trưa" },
          { time: "14h00-14h40", text: "Vệ sinh - Ăn bữa phụ" },
          { time: "14h40-15h40", text: "Chơi - Hoạt động tự chọn" },
          { time: "15h40-17h00", text: "Trả trẻ" },
        ],
      },
      {
        key: "5-6",
        label: "5-6 tuổi",
        badge: "5-6 tuổi",
        img: "/assets/images/activities-56.jpg",
        activities: [
          "Lễ giáo",
          "Khám phá khoa học",
          "Trải nghiệm âm nhạc - Múa",
          "Làm quen Văn học, Chữ viết",
          "Thể dục - Chăm sóc sức khoẻ",
          "Tạo hình",
          "Làm quen với Toán",
          "Làm quen tiếng Anh",
          "Erobic",
          "Bơi",
          "Trải nghiệm tự nhiên",
        ],
        schedule: [
          { time: "6h30-8h00", text: "Đón trẻ hoạt động tự chọn" },
          { time: "8h00-8h50", text: "Hoạt động học" },
          { time: "8h50-9h30", text: "Hoạt động nhóm" },
          { time: "9h30-10h10", text: "Hoạt động ngoài trời" },
          { time: "10h10-11h10", text: "Vệ sinh - Ăn trưa" },
          { time: "11h10-14h00", text: "Ngủ trưa" },
          { time: "14h00-14h40", text: "Vệ sinh - Ăn bữa phụ" },
          { time: "14h40-15h40", text: "Chơi - Hoạt động tự chọn" },
          { time: "15h40-17h00", text: "Trẻ chuẩn bị ra về và trả trẻ" },
        ],
      },
    ],
    []
  )

  const [activeKey, setActiveKey] = useState<AgeKey>("3-4")
  const current = programs.find((p) => p.key === activeKey) ?? programs[0]

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative py-12 md:py-16 bg-primary text-white overflow-hidden"
    >
      {/* Pattern overlay (optional) */}
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Bottom light area + giraffe (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/90" />
      <Image
        width={100} height={100}
        src="/assets/images/giraffe.png"
        alt=""
        className="hidden md:block absolute bottom-0 right-10 w-24 opacity-90 pointer-events-none"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = "none"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            Hoạt động của bé tại trường
          </h2>
          <p className="mt-3 text-white/90">
            Các hoạt động, giờ giấc đa dạng, phù hợp với độ tuổi và bám sát theo sự phát triển toàn diện của trẻ.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {programs.map((p) => {
            const isActive = p.key === activeKey
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveKey(p.key)}
                className={`
                  px-7 py-2.5 rounded-xl font-bold transition
                  border-2
                  ${isActive
                    ? "bg-white text-primary border-white shadow-lg"
                    : "bg-transparent text-white border-white/60 hover:bg-white/10 hover:border-white"}
                `}
                aria-pressed={isActive}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        {/* Card */}
        <div className="mt-8 max-w-5xl mx-auto">
          {/* ✅ overflow-visible để badge không bị cắt */}
          <div className="rounded-3xl shadow-2xl bg-white text-slate-800 overflow-visible">
            {/* Image */}
            <div className="relative h-[210px] sm:h-[270px] md:h-[320px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.key}
                  src={current.img}
                  alt={current.badge}
                  className="w-full h-full object-cover rounded-t-3xl"
                  initial={{ opacity: 0.2, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>

              {/* ✅ Badge moved to TOP + z-50 để không bị wave che */}
              <div className="absolute left-6 top-6 z-50">
                <span className="inline-flex items-center px-5 py-2 rounded-xl bg-emerald-500 text-white font-extrabold shadow-lg">
                  {current.badge}
                </span>
              </div>

              {/* Wave */}
              <div className="absolute left-0 right-0 -bottom-1 z-10">
                <svg viewBox="0 0 1440 120" className="w-full h-[70px] sm:h-[90px]">
                  <path
                    fill="white"
                    d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L0,120Z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-10 pb-10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left column: Activities */}
                <div>
                  <h3 className="text-2xl font-extrabold text-primary mb-4">
                    Hoạt động
                  </h3>
                  <ul className="space-y-3">
                    {current.activities.map((it, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 leading-relaxed">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ✅ Right column: Schedule with LIGHT GREEN background */}
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
                  <h3 className="text-2xl font-extrabold text-primary mb-4">
                    Thời gian biểu
                  </h3>
                  <ul className="space-y-3">
                    {current.schedule.map((it, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <div className="text-slate-700 leading-relaxed">
                          <span className="font-extrabold text-slate-900">
                            {it.time}:
                          </span>{" "}
                          {it.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
