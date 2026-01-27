"use client"
import { useRef } from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Beaker, Award, Leaf, Dumbbell, GraduationCap, Sparkles, Star, Check, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const brandPalette = {
  green: "#33B54A",
  orange: "#F78F1E",
  lightGreen: "rgba(51, 181, 74, 0.1)",
  lightOrange: "rgba(247, 143, 30, 0.1)",
}

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
    color: brandPalette.green,
    lightBg: brandPalette.lightGreen,
  },
  {
    id: "steam",
    title: "Hoạt động STEAM",
    subtitle: "Khơi dậy tư duy và niềm yêu thích khám phá",
    fullDescription:
      "Các hoạt động STEAM được tổ chức thông qua thí nghiệm, dự án nhỏ và hoạt động khám phá phù hợp từng độ tuổi, giúp trẻ phát triển tư duy khoa học, sáng tạo, khả năng quan sát, giải quyết vấn đề và làm việc nhóm, đồng thời nuôi dưỡng niềm yêu thích học hỏi.",
    details: [
      "Phát triển tư duy khoa học, sáng tạo, khả năng quan sát",
      "Giải quyết vấn đề và làm việc nhóm",
      "Nuôi dưỡng niềm yêu thích học hỏi",
      "Phòng STEAM LAB chuyên biệt, được trang bị đầy đủ học liệu và dụng cụ",
      "Không gian cho trẻ trải nghiệm, thực hành và khám phá khoa học một cách trực quan, sinh động",
    ],
    icon: Beaker,
    color: brandPalette.orange,
    lightBg: brandPalette.lightOrange,
  },
  {
    id: "talent",
    title: "Phát triển năng khiếu",
    subtitle: "Điểm khác biệt nổi bật tại Trúc Xinh",
    fullDescription:
      "Trúc Xinh đặc biệt chú trọng phát hiện và bồi dưỡng năng khiếu, rèn luyện sự tự tin và khả năng giao tiếp trước đám đông cho trẻ thông qua các hoạt động: Hát – múa – nhảy hiện đại, MC nhí, Aerobic và Tiếng Anh.",
    details: [
      "Hát – múa – nhảy hiện đại",
      "MC nhí, Aerobic và Tiếng Anh",
      "Trẻ được biểu diễn, thể hiện bản thân trên sân khấu rộng, hiện đại của nhà trường",
    ],
    icon: Award,
    color: brandPalette.green,
    lightBg: brandPalette.lightGreen,
  },
  {
    id: "physical",
    title: "Phát triển trí tuệ và thể chất",
    subtitle: "Phát triển toàn diện",
    fullDescription: "Nhà trường đầu tư hệ thống phòng chức năng, phòng chơi trí tuệ, đồ chơi ngoài trời đa dạng, cùng bể bơi an toàn, hiện đại, tạo điều kiện cho trẻ phát triển hài hòa cả vận động, thể lực và tư duy.",
    details: [
      "Hệ thống phòng chức năng hiện đại",
      "Phòng chơi trí tuệ, đồ chơi ngoài trời đa dạng",
      "Bể bơi an toàn, hiện đại",
      "Tạo điều kiện cho trẻ phát triển hài hòa cả vận động, thể lực và tư duy",
    ],
    icon: Dumbbell,
    color: brandPalette.orange,
    lightBg: brandPalette.lightOrange,
  },
  {
    id: "experience",
    title: "Trải nghiệm – Kỹ năng sống – Gắn kết thiên nhiên",
    subtitle: "Gắn kết thiên nhiên",
    fullDescription: "Trẻ được học thông qua trải nghiệm thực tế với các hoạt động: trải nghiệm thiên nhiên, chăm sóc cây xanh, vật nuôi; tham gia lễ hội, trò chơi dân gian, hoạt động ẩm thực; giáo dục kỹ năng sống: tự phục vụ, hợp tác, làm việc nhóm.",
    details: [
      "Trải nghiệm thiên nhiên, chăm sóc cây xanh, vật nuôi",
      "Tham gia lễ hội, trò chơi dân gian, hoạt động ẩm thực",
      "Giáo dục kỹ năng sống: tự phục vụ, hợp tác, làm việc nhóm",
    ],
    icon: Leaf,
    color: brandPalette.green,
    lightBg: brandPalette.lightGreen,
  },
]

const journeyStages = [
  {
    id: "bee",
    name: "Bee",
    fullName: "Lớp Bee",
    age: "18-30 tháng",
    emoji: "🐝",
    color: brandPalette.orange,
    gradient: "from-[#F78F1E] to-[#FFB357]",
    lightBg: brandPalette.lightOrange,
    tagline: "Những bước chân đầu tiên",
    description: "Khám phá thế giới qua giác quan, xây dựng sự gắn bó và niềm tin",
    milestones: [
      { title: "Thích nghi", desc: "Làm quen môi trường, xa cha mẹ" },
      { title: "Vận động", desc: "Đi, chạy, leo trèo an toàn" },
      { title: "Ngôn ngữ", desc: "Bài hát, trò chuyện, đọc truyện" },
      { title: "Xã hội", desc: "Chơi cùng bạn, chia sẻ đồ chơi" },
    ],
    features: ["Góc giác quan", "Nhạc vận động", "Chăm sóc chu đáo"],
  },
  {
    id: "mouse",
    name: "Mouse",
    fullName: "Lớp Mouse",
    age: "3-4 tuổi",
    emoji: "🐭",
    color: brandPalette.green,
    gradient: "from-[#33B54A] to-[#2EA44F]",
    lightBg: brandPalette.lightGreen,
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
    color: brandPalette.orange,
    gradient: "from-[#F78F1E] to-[#F48C2A]",
    lightBg: brandPalette.lightOrange,
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
    color: brandPalette.green,
    gradient: "from-[#33B54A] to-[#2D9C49]",
    lightBg: brandPalette.lightGreen,
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
      title: "Chuẩn bị sẵn sàng vào lớp một",
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
    <div ref={containerRef} className="relative overflow-hidden bg-gradient-to-b from-[#E8F5E9] via-white to-[#FFF3E0]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 size-[250px] sm:-top-30 sm:-left-30 sm:size-[350px] md:-top-40 md:-left-40 md:size-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(247,143,30,0.35) 0%, transparent 70%)",
            y: backgroundY,
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 size-[300px] sm:-bottom-30 sm:-right-30 sm:size-[400px] md:-bottom-40 md:-right-40 md:size-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(51,181,74,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero Banner Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F78F1E]/20 via-white via-50% to-[#33B54A]/20" />
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute -top-40 -left-40 size-[600px] sm:size-[800px] md:size-[1000px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(247,143,30,0.5) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 size-[600px] sm:size-[800px] md:size-[1000px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(51,181,74,0.5) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          {/* Floating decorative elements */}
          <motion.div
            className="hidden sm:block absolute top-20 right-[10%] size-20 md:size-28 rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#FFB357] opacity-25 shadow-2xl"
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden sm:block absolute bottom-20 left-[10%] size-24 md:size-32 rounded-full bg-gradient-to-br from-[#33B54A] to-[#2EA44F] opacity-25 shadow-2xl"
            animate={{ y: [0, 25, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="hidden md:block absolute top-1/2 left-[5%] size-16 rounded-2xl bg-gradient-to-br from-[#F78F1E] to-[#FFB357] opacity-20 shadow-xl"
            animate={{ y: [0, -25, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="hidden lg:block absolute top-32 left-[30%] size-12 rounded-full bg-[#33B54A] opacity-30 shadow-lg"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="hidden lg:block absolute bottom-32 right-1/4 size-14 rounded-xl bg-[#F78F1E] opacity-25 shadow-lg"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-center lg:text-left space-y-6 sm:space-y-8"
            >
              

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight"
              >
                <span className="block whitespace-nowrap">
                  <span className="bg-gradient-to-r from-[#F78F1E] via-[#F78F1E] to-[#FFB357] bg-clip-text text-transparent">
                    Hành trình
                  </span>{" "}
                  <span className="text-gray-900">phát triển</span>
                </span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-[#33B54A] via-[#33B54A] to-[#2EA44F] bg-clip-text text-transparent">
                    toàn diện
                  </span>{" "}
                  <span className="text-gray-900">cho bé</span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Từ những bước chân đầu tiên đến cổng trường Tiểu học, chúng tôi đồng hành cùng bé trong suốt hành trình
                khám phá và phát triển.
              </motion.p>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
              >
                <motion.div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-[#F78F1E]/30 shadow-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="text-3xl sm:text-4xl">🎯</div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#F78F1E] to-[#FFB357] bg-clip-text text-transparent">
                      5
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700">Chương trình cốt lõi</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-[#33B54A]/30 shadow-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="text-3xl sm:text-4xl">🎓</div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#33B54A] to-[#2EA44F] bg-clip-text text-transparent">
                      4
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700">Khối lớp theo tuổi</div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-[#F78F1E]/30 shadow-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="text-3xl sm:text-4xl">⭐</div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#F78F1E] to-[#FFB357] bg-clip-text text-transparent">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700">Sẵn sàng lớp một</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right side - Enhanced visual grid with class previews */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative mt-8 lg:mt-8"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {journeyStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.06, 
                      y: -6,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25,
                        mass: 0.7
                      }
                    }}
                    transition={{ 
                      delay: 0.4 + index * 0.15, 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 30,
                      mass: 0.7,
                      layout: { duration: 0.2 }
                    }}
                    style={{ willChange: "transform" }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl cursor-pointer",
                      "bg-gradient-to-br border-2 border-white/20",
                      stage.gradient,
                      "backdrop-blur-sm"
                    )}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="relative z-10 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <motion.span
                          className="text-3xl sm:text-4xl md:text-5xl shrink-0 drop-shadow-2xl leading-none"
                          animate={{ rotate: [-8, 8, -8], scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.3,
                          }}
                        >
                          {stage.emoji}
                        </motion.span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight drop-shadow-lg">
                            {stage.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-white/85 font-medium mt-0.5 leading-tight">{stage.age}</p>
                        </div>
                      </div>
                      <div className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/30 shadow-lg">
                        <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-md leading-tight">
                          {stage.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced decorative elements */}
                    <div className="absolute -bottom-4 -right-4 size-16 sm:size-20 rounded-full bg-white/15 backdrop-blur-sm" />
                    <div className="absolute top-2 right-2 size-8 rounded-full bg-white/10" />
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
              5 trụ cột giáo dục <span className="font-semibold text-[#F78F1E]">xuyên suốt</span> • Kiến tạo tương lai cho bé
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
                  <motion.div
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm"
                    style={{ borderLeftWidth: "4px", borderLeftColor: program.color }}
                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.2 }}
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
                          className="shrink-0 flex items-center justify-center size-10 sm:size-12 rounded-lg sm:rounded-xl shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${program.color}, ${program.color}dd)`,
                            willChange: "transform"
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <Icon className="size-5 sm:size-6 text-white" />
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
                                  className="size-2.5 sm:size-3 shrink-0 mt-0.5 sm:mt-0"
                                  style={{ color: program.color }}
                                />
                                <span className="leading-tight">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.15, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 25
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }
                }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${stage.color}30, ${stage.color}15)`,
                  }}
                />

                <div
                  className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-white"
                  style={{ 
                    border: `2px solid ${stage.color}15`,
                  }}
                >
                  {/* Header bar - Enhanced */}
                  <div className={cn("relative px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-r overflow-hidden", stage.gradient)}>
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    />
                    
                    <div className="relative flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <motion.span
                            className="text-3xl sm:text-4xl md:text-5xl drop-shadow-xl block"
                            animate={{ 
                              rotate: [-5, 5, -5],
                              y: [0, -3, 0]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Number.POSITIVE_INFINITY, 
                              ease: "easeInOut",
                              delay: index * 0.2
                            }}
                          >
                            {stage.emoji}
                          </motion.span>
                          {/* Glow around emoji */}
                          <div 
                            className="absolute inset-0 blur-xl opacity-50 -z-10"
                            style={{ background: stage.color }}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-lg mb-1">
                            {stage.fullName}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/90 font-semibold">{stage.tagline}</p>
                        </div>
                      </div>
                      <motion.span 
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-white/25 rounded-full backdrop-blur-md whitespace-nowrap shadow-lg border border-white/30"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {stage.age}
                      </motion.span>
                    </div>
                  </div>

                  {/* Content - Enhanced */}
                  <div className="relative p-5 sm:p-6">
                    <motion.p 
                      className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 font-medium leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {stage.description}
                    </motion.p>

                    {/* Milestones - Enhanced */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                      {stage.milestones.map((milestone, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          className="group/milestone relative p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-2 shadow-md hover:shadow-lg transition-all duration-300"
                          style={{
                            borderColor: `${stage.color}25`,
                          }}
                        >
                          {/* Hover glow */}
                          <div 
                            className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover/milestone:opacity-100 transition-opacity duration-300 blur-sm"
                            style={{ background: `${stage.color}15` }}
                          />
                          <div className="relative">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div 
                                className="size-1.5 rounded-full"
                                style={{ background: stage.color }}
                              />
                              <div 
                                className="text-xs sm:text-sm font-black"
                                style={{ color: stage.color }}
                              >
                                {milestone.title}
                              </div>
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed font-medium">
                              {milestone.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Features - Enhanced */}
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-4">
                      {stage.features.map((feature, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full border-2 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                          style={{
                            borderColor: `${stage.color}40`,
                            color: stage.color,
                            background: `${stage.color}10`,
                          }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* Special Program - Enhanced */}
                    {stage.specialProgram && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -3,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className="mt-4 sm:mt-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br text-white relative overflow-hidden shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${brandPalette.green}, #2EA44F, #2D9C49)`,
                        }}
                      >
                        {/* Animated background elements */}
                        <div className="absolute top-0 right-0 size-24 sm:size-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 size-20 sm:size-28 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                        
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }}
                        />
                        
                        <div className="relative">
                          <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            >
                              <GraduationCap className="size-5 sm:size-6" />
                            </motion.div>
                            <span className="text-sm sm:text-base font-black">{stage.specialProgram.title}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
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
