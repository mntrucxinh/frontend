'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { useTheme } from 'next-themes'

type Sakura = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  life: number
  maxLife: number
  size: number
  alpha: number
  hueShift: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

/** Vẽ bông hoa anh đào 5 cánh + nhụy */
function drawSakura(ctx: CanvasRenderingContext2D, size: number, alpha: number, hueShift: number) {
  // màu cánh
  const petalGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, size * 2.8)
  petalGrad.addColorStop(0, `rgba(255, 235, 245, ${0.95 * alpha})`)
  petalGrad.addColorStop(
    1,
    `rgba(255, ${120 + hueShift * 0.3}, ${190 + hueShift * 0.2}, ${0.65 * alpha})`
  )

  // 5 cánh (ellipse) -> đảm bảo nhìn ra hoa khi nhỏ
  ctx.fillStyle = petalGrad
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.rotate((i * Math.PI * 2) / 5)
    ctx.translate(0, -size * 1.05)

    // cánh
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.62, size * 0.95, 0, 0, Math.PI * 2)
    ctx.fill()

    // notch (lõm nhẹ ở đầu cánh)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.55, size * 0.18, size * 0.22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'

    // highlight
    ctx.fillStyle = `rgba(255,255,255,${0.18 * alpha})`
    ctx.beginPath()
    ctx.ellipse(-size * 0.12, -size * 0.15, size * 0.16, size * 0.25, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
    ctx.fillStyle = petalGrad
  }

  // nhụy
  const centerGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, size * 1.1)
  centerGrad.addColorStop(0, `rgba(255, 250, 210, ${0.95 * alpha})`)
  centerGrad.addColorStop(1, `rgba(255, 170, 80, ${0.7 * alpha})`)

  ctx.fillStyle = centerGrad
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2)
  ctx.fill()

  // hạt nhụy
  ctx.fillStyle = `rgba(255,255,255,${0.22 * alpha})`
  ctx.beginPath()
  ctx.arc(-size * 0.14, -size * 0.16, size * 0.12, 0, Math.PI * 2)
  ctx.fill()
}

export default function WomenDayPopup() {
  const { resolvedTheme } = useTheme()
  const isWomenDay = resolvedTheme === 'womenDay'

  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const sakurasRef = useRef<Sakura[]>([])
  const lastSpawnRef = useRef<number>(0)

  useEffect(() => {
    setOpen(isWomenDay)
  }, [isWomenDay])

  useEffect(() => {
    if (!open) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      sakurasRef.current = []
      lastSpawnRef.current = 0
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Nền hồng tím
    const base = { r: 55, g: 8, b: 42 }
    const paintBackground = () => {
      ctx.fillStyle = `rgb(${base.r},${base.g},${base.b})`
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    }

    const spawnSakuras = () => {
      const count = Math.floor(rand(1, 5))
      for (let i = 0; i < count; i++) {
        sakurasRef.current.push({
          x: rand(-40, canvas.clientWidth + 40),
          y: rand(-120, -20),
          vx: rand(-0.35, 0.35),
          vy: rand(0.9, 1.6),
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.03, 0.03),
          life: 0,
          maxLife: Math.floor(rand(320, 520)),
          size: rand(4.2, 7.5),
          alpha: 1,
          hueShift: rand(-25, 25),
        })
      }
    }

    // init
    paintBackground()
    spawnSakuras()

    const tick = (t: number) => {
      // ✅ Không dùng trail để tránh vệt dài
      paintBackground()

      // rải hoa đều
      const spawnEvery = 260
      if (t - lastSpawnRef.current > spawnEvery) {
        lastSpawnRef.current = t
        spawnSakuras()
      }

      // gió nhẹ
      const wind = Math.sin(t / 900) * 0.25

      const p = sakurasRef.current
      for (let i = p.length - 1; i >= 0; i--) {
        const it = p[i]

        it.life += 1
        it.vx += wind * 0.004
        it.x += it.vx * 1.2
        it.y += it.vy * 1.2
        it.rot += it.vr

        const lifeRatio = it.life / it.maxLife
        it.alpha = 1 - lifeRatio

        // out
        if (it.y > canvas.clientHeight + 60 || it.alpha <= 0 || it.life >= it.maxLife) {
          p.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(it.x, it.y)
        ctx.rotate(it.rot)
        drawSakura(ctx, it.size, it.alpha, it.hueShift)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      sakurasRef.current = []
      lastSpawnRef.current = 0
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Canvas nền hiệu ứng */}
      <div className='pointer-events-none fixed inset-0 z-[9000]'>
        <canvas ref={canvasRef} className='absolute inset-0' />
      </div>

      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        placement='center'
        backdrop='transparent'
        classNames={{
          wrapper: 'z-[9999]',
          base: 'bg-white/10 backdrop-blur-md border-none text-white',
          header: 'justify-center',
          body: 'flex flex-col items-center text-center gap-4',
          closeButton: 'z-[50]', // ✅ đảm bảo bấm X được
        }}
      >
        <ModalContent className='relative overflow-hidden p-4'>
          <>
            {/* decor glow */}
            <div className='pointer-events-none absolute inset-0 opacity-30'>
              <div className='absolute -left-24 -top-24 size-64 rounded-full bg-pink-400 blur-3xl' />
              <div className='absolute -bottom-28 -right-24 size-72 rounded-full bg-fuchsia-500 blur-3xl' />
            </div>

            <div className='relative z-10'>
              <ModalHeader>
                <h2
                  className='bg-gradient-to-r from-pink-200 via-rose-200 to-fuchsia-300 bg-clip-text text-center text-2xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-5xl'
                  style={{ WebkitTextStroke: '0.6px rgba(255,255,255,0.22)' }}
                >
                  Chúc Mừng Ngày Quốc Tế Phụ Nữ
                </h2>
              </ModalHeader>

              <ModalBody>
                <div className='mt-1 text-sm text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] md:text-base'>
                  Chúc bạn luôn rạng rỡ, hạnh phúc và được yêu thương thật nhiều!
                </div>

                <Image
                  src='/assets/images/womenday.png'
                  alt='Women Day'
                  width={220}
                  height={220}
                  className='mx-auto mb-2 mt-3'
                  priority
                />
              </ModalBody>
            </div>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
