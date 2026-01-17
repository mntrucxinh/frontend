"use client"
import { useRef } from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Beaker, Award, Leaf, Dumbbell, GraduationCap, Sparkles, Star, Check, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const corePrograms = [
  {
    id: "ministry",
    title: "Chương trình Bộ GD&ĐT",
    subtitle: "Lấy trẻ làm trung tâm",
    fullDescription:
      "Chương trình giáo dục tại Trúc Xinh được xây dựng trên nền tảng Chương trình Giáo dục Mầm non của Bộ GD&ĐT, theo định hướng giáo dục lấy trẻ làm trung tâm.",
    details: [
      "Phát triển hài hòa thể chất – trí tuệ – cảm xúc – ngôn ngữ – kỹ năng xã hội",
      "Tôn trọng sự khác biệt, năng lực và nhịp độ phát triển của mỗi trẻ",
      "Giúp trẻ học tập tự nhiên, nhẹ nhàng và hiệu quả",
    ],
    icon: BookOpen,
    color: "#22c55e", // green
    lightBg: "rgba(34, 197, 94, 0.1)",
  },
  {
    id: "steam",
    title: "Hoạt động STEAM",
    subtitle: "Khơi dậy tư duy và niềm yêu thích khám phá",
    fullDescription:
      "Các hoạt động STEAM được tổ chức thông qua thí nghiệm, dự án nhỏ và hoạt động khám phá phù hợp từng độ tuổi.",
    details: [
      "Phát triển tư duy khoa học, sáng tạo, khả năng quan sát",
      "Giải quyết vấn đề và làm việc nhóm",
      "Phòng STEAM LAB chuyên biệt với học liệu và dụng cụ đầy đủ",
      "Không gian trải nghiệm, thực hành và khám phá khoa học trực quan, sinh động",
    ],
    icon: Beaker,
    color: "#f97316", // orange
    lightBg: "rgba(249, 115, 22, 0.1)",
  },
  {
    id: "talent",
    title: "Phát triển năng khiếu",
    subtitle: "Điểm khác biệt nổi bật tại Trúc Xinh",
    fullDescription:
      "Trúc Xinh đặc biệt chú trọng phát hiện và bồi dưỡng năng khiếu, rèn luyện sự tự tin và khả năng giao tiếp trước đám đông.",
    details: [
      "Hát – múa – nhảy hiện đại",
      "MC nhí, Aerobic và Tiếng Anh",
      "Biểu diễn, thể hiện bản thân trên sân khấu rộng, hiện đại",
    ],
    icon: Award,
    color: "#16a34a", // green-600
    lightBg: "rgba(22, 163, 74, 0.1)",
  },
  {
    id: "physical",
    title: "Phát triển Trí tuệ & Thể chất",
    subtitle: "Phát triển toàn diện",
    fullDescription: "Nhà trường đầu tư hệ thống phòng chức năng, phòng chơi trí tuệ, đồ chơi ngoài trời đa dạng.",
    details: [
      "Hệ thống phòng chức năng hiện đại",
      "Phòng chơi trí tuệ, đồ chơi ngoài trời đa dạng",
      "Bể bơi an toàn, hiện đại",
      "Phát triển hài hòa vận động, thể lực và tư duy",
    ],
    icon: Dumbbell,
    color: "#ea580c", // orange-600
    lightBg: "rgba(234, 88, 12, 0.1)",
  },
  {
    id: "experience",
    title: "Trải nghiệm & Kỹ năng sống",
    subtitle: "Gắn kết thiên nhiên",
    fullDescription: "Trẻ được học thông qua trải nghiệm thực tế với các hoạt động đa dạng.",
    details: [
      "Trải nghiệm thiên nhiên, chăm sóc cây xanh, vật nuôi",
      "Tham gia lễ hội, trò chơi dân gian, hoạt động ẩm thực",
      "Giáo dục kỹ năng sống: tự phục vụ, hợp tác, làm việc nhóm",
    ],
    icon: Leaf,
    color: "#15803d", // green-700
    lightBg: "rgba(21, 128, 61, 0.1)",
  },
]

const journeyStages = [
  {
    id: "bee",
    name: "Bee",
    fullName: "Lớp Bee",
    age: "18-30 tháng",
    emoji: "🐝",
    color: "#f97316",
    gradient: "from-orange-400 to-amber-500",
    lightBg: "rgba(249, 115, 22, 0.08)",
    tagline: "Những bước chân đầu tiên",
    description: "Khám phá thế giới qua giác quan, xây dựng sự gắn bó và niềm tin",
    milestones: [
      { title: "Thích nghi", desc: "Làm quen môi trường, xa cha mẹ" },
      { title: "Vận động", desc: "Đi, chạy, leo trèo an toàn" },
      { title: "Ngôn ngữ", desc: "Bài hát, trò chuyện, đọc truyện" },
      { title: "Xã hội", desc: "Chơi cùng bạn, chia sẻ đồ chơi" },
    ],
    features: ["Tỉ lệ 1:5", "Góc giác quan", "Nhạc vận động"],
  },
  {
    id: "mouse",
    name: "Mouse",
    fullName: "Lớp Mouse",
    age: "3-4 tuổi",
    emoji: "🐭",
    color: "#22c55e",
    gradient: "from-green-400 to-emerald-500",
    lightBg: "rgba(34, 197, 94, 0.08)",
    tagline: "Bước đầu khám phá bản thân",
    description: "Phát triển ngôn ngữ và kỹ năng giao tiếp xã hội",
    milestones: [
      { title: "Từ vựng", desc: "Nói câu hoàn chỉnh, diễn đạt ý" },
      { title: "Cảm xúc", desc: "Nhận biết và thể hiện phù hợp" },
      { title: "Tự lập", desc: "Ăn, mặc, vệ sinh cá nhân" },
      { title: "Hợp tác", desc: "Hoạt động nhóm, chờ đợi lượt" },
    ],
    features: ["Góc đọc sách", "Dự án chủ đề", "Ngoài trời"],
  },
  {
    id: "bear",
    name: "Bear",
    fullName: "Lớp Bear",
    age: "4-5 tuổi",
    emoji: "🐻",
    color: "#ea580c",
    gradient: "from-orange-500 to-orange-600",
    lightBg: "rgba(234, 88, 12, 0.08)",
    tagline: "Sáng tạo không giới hạn",
    description: "Phát triển tư duy logic và khả năng sáng tạo",
    milestones: [
      { title: "Logic", desc: "Trò chơi, câu đố tư duy" },
      { title: "STEAM", desc: "Thí nghiệm, xây dựng mô hình" },
      { title: "Nghệ thuật", desc: "Vẽ, nặn, thủ công sáng tạo" },
      { title: "Tự tin", desc: "Làm việc nhóm, thuyết trình" },
    ],
    features: ["STEAM Lab", "Sân khấu nhỏ", "Góc nghệ thuật"],
  },
  {
    id: "dolphin",
    name: "Dolphin",
    fullName: "Lớp Dolphin",
    age: "5-6 tuổi",
    emoji: "🐬",
    color: "#16a34a",
    gradient: "from-green-500 to-green-600",
    lightBg: "rgba(22, 163, 74, 0.08)",
    tagline: "Tự tin bước vào Tiểu học",
    description: "Trang bị đầy đủ kiến thức và kỹ năng cho lớp Một",
    milestones: [
      { title: "Chữ & Số", desc: "Làm quen chữ cái, toán cơ bản" },
      { title: "Tập trung", desc: "Ngồi học đúng tư thế, chú ý" },
      { title: "Viết", desc: "Cầm bút đúng cách, tập viết" },
      { title: "Chủ động", desc: "Tự tin, chủ động trong học tập" },
    ],
    features: ["Tiền tiểu học", "Luyện viết/đọc", "Mô phỏng lớp Một"],
    specialProgram: {
      title: "Chuẩn bị sẵn sàng vào lớp Một",
      description:
        "Trúc Xinh trang bị cho trẻ nền tảng kiến thức, kỹ năng, thói quen học tập và tâm thế vững vàng, giúp trẻ tự tin bước vào bậc Tiểu học.",
    },
  },
]

export default function EducationProgramSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-[250px] h-[250px] sm:-top-30 sm:-left-30 sm:w-[350px] sm:h-[350px] md:-top-40 md:-left-40 md:w-[500px] md:h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)",
            y: backgroundY,
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[300px] h-[300px] sm:-bottom-30 sm:-right-30 sm:w-[400px] sm:h-[400px] md:-bottom-40 md:-right-40 md:w-[600px] md:h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <section className="relative py-8 sm:py-10 md:py-14 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-green-500/10" />
          <motion.div
            className="hidden sm:block absolute top-10 right-[15%] w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 opacity-20"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden sm:block absolute bottom-10 left-[10%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 opacity-15"
            animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="hidden md:block absolute top-1/2 left-[5%] w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 opacity-15"
            animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="hidden lg:block absolute top-20 left-[25%] w-8 h-8 rounded-full bg-green-400 opacity-20"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden lg:block absolute bottom-20 right-[20%] w-10 h-10 rounded-lg bg-orange-400 opacity-15"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-tight">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Hành trình
                </span>{" "}
                <span className="text-gray-800">phát triển</span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                  toàn diện
                </span>{" "}
                <span className="text-gray-800">cho bé</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Từ những bước chân đầu tiên đến cổng trường Tiểu học, chúng tôi đồng hành cùng bé trong suốt hành trình
                khám phá và phát triển.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <motion.div
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-orange-100 border border-orange-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-xl sm:text-2xl">🎯</span>
                  <div>
                    <div className="text-base sm:text-lg font-black text-orange-600">5</div>
                    <div className="text-[10px] sm:text-xs text-orange-600/80">Chương trình cốt lõi</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-green-100 border border-green-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-xl sm:text-2xl">🎓</span>
                  <div>
                    <div className="text-base sm:text-lg font-black text-green-600">4</div>
                    <div className="text-[10px] sm:text-xs text-green-600/80">Khối lớp theo tuổi</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-100 border border-amber-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-xl sm:text-2xl">⭐</span>
                  <div>
                    <div className="text-base sm:text-lg font-black text-amber-600">100%</div>
                    <div className="text-[10px] sm:text-xs text-amber-600/80">Sẵn sàng lớp 1</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Visual grid with class previews */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-6 lg:mt-0"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {journeyStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={cn(
                      "relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg cursor-pointer",
                      "bg-gradient-to-br",
                      stage.gradient,
                    )}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-60" />

                    <div className="relative">
                      <motion.span
                        className="text-2xl sm:text-3xl md:text-4xl block mb-1 sm:mb-2 drop-shadow-lg"
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        {stage.emoji}
                      </motion.span>
                      <h3 className="text-sm sm:text-base md:text-lg font-black text-white mb-0.5">{stage.name}</h3>
                      <p className="text-[10px] sm:text-xs text-white/80 font-medium">{stage.age}</p>
                      <div className="mt-1.5 sm:mt-2 inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                        <span className="text-[8px] sm:text-[10px] md:text-[12px] font-semibold text-white">
                          {stage.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Decorative circle */}
                    <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='mb-16 text-center md:mb-20'
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='mb-6 text-3xl font-black tracking-tight md:text-5xl lg:text-6xl'
            >
              <span className='text-[#33B54A]'>Nền tảng </span>
              <span className='text-[#F78F1E]'>Vững chắc</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg'
            >
              5 trụ cột giáo dục <span className="font-semibold text-[#F78F1E]">xuyên suốt</span> • Kiến tạo tươnglai cho bé
            </motion.p>
          </motion.div>

          {/* Programs Grid */}
          <div className="space-y-3 sm:space-y-4">
            {corePrograms.map((program, index) => {
              const Icon = program.icon
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.01 }}
                  className="group relative"
                >
                  <div
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                    style={{ borderLeftWidth: "4px", borderLeftColor: program.color }}
                  >
                    {/* Subtle background gradient on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: program.lightBg }}
                    />

                    <div className="relative p-4 sm:p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <motion.div
                          className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${program.color}, ${program.color}dd)` }}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800">{program.title}</h3>
                            <span
                              className="self-start sm:self-auto px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full"
                              style={{ background: program.lightBg, color: program.color }}
                            >
                              {program.subtitle}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">
                            {program.fullDescription}
                          </p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {program.details.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-start sm:items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-gray-50 border border-gray-100 text-[10px] sm:text-xs text-gray-700"
                              >
                                <Check
                                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5 sm:mt-0"
                                  style={{ color: program.color }}
                                />
                                <span className="leading-tight">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Journey Stages Section */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='mb-16 text-center md:mb-20'
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='mb-6 text-3xl font-black tracking-tight md:text-5xl lg:text-6xl'
            >
              <span className='text-[#33B54A]'>Hành trình </span>
              <span className='text-[#F78F1E]'>Khôn lớn</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg'
            >
              4 cột mốc <span className="font-semibold text-[#F78F1E]">vàng</span> theo độ tuổi • Mỗi bước đi là một dấu ấn
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group"
              >
                <div
                  className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
                  style={{ background: stage.lightBg }}
                >
                  {/* Header bar */}
                  <div className={cn("relative px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r", stage.gradient)}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
                    <div className="relative flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.span
                          className="text-2xl sm:text-3xl md:text-4xl drop-shadow-md"
                          animate={{ rotate: [-3, 3, -3] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          {stage.emoji}
                        </motion.span>
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-black text-white">{stage.fullName}</h3>
                          <p className="text-xs sm:text-sm text-white/80">{stage.tagline}</p>
                        </div>
                      </div>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold text-white bg-white/20 rounded-full backdrop-blur-sm whitespace-nowrap">
                        {stage.age}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{stage.description}</p>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {stage.milestones.map((milestone, i) => (
                        <div
                          key={i}
                          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-gray-100 shadow-sm"
                        >
                          <div className="text-xs sm:text-sm font-bold mb-0.5" style={{ color: stage.color }}>
                            {milestone.title}
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-500 leading-snug">{milestone.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {stage.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full border"
                          style={{
                            borderColor: stage.color,
                            color: stage.color,
                            background: `${stage.color}10`,
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {stage.specialProgram && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-bold">{stage.specialProgram.title}</span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed">
                            {stage.specialProgram.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
