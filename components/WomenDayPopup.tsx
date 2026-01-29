'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { useTheme } from 'next-themes'

type Petal = {
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
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export default function WomenDayPopup() {
  const { resolvedTheme } = useTheme()
  const isWomenDay = resolvedTheme === 'womenDay'

  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const petalsRef = useRef<Petal[]>([])
  const lastSpawnRef = useRef<number>(0)

  // mở khi đúng theme
  useEffect(() => {
    setOpen(isWomenDay)
  }, [isWomenDay])

  useEffect(() => {
    if (!open) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      petalsRef.current = []
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

    // nền hồng tím nhẹ
    const base = { r: 60, g: 10, b: 45 }
    const fillBackground = (alpha: number) => {
      ctx.fillStyle = `rgba(${base.r},${base.g},${base.b},${alpha})`
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    }

    const spawnPetals = () => {
      const count = Math.floor(rand(8, 14))
      for (let i = 0; i < count; i++) {
        petalsRef.current.push({
          x: rand(0, canvas.clientWidth),
          y: -20,
          vx: rand(-0.35, 0.35),
          vy: rand(0.9, 1.7),
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.03, 0.03),
          life: 0,
          maxLife: Math.floor(rand(260, 420)),
          size: rand(3.5, 6.5),
          alpha: 1,
        })
      }
    }

    fillBackground(1)

    const tick = (t: number) => {
      // trail nhẹ cho “mềm”
      fillBackground(0.12)

      // rải cánh hoa mỗi ~250ms
      const spawnEvery = 260
      if (t - lastSpawnRef.current > spawnEvery) {
        lastSpawnRef.current = t
        spawnPetals()
      }

      const wind = Math.sin(t / 900) * 0.25

      const p = petalsRef.current
      for (let i = p.length - 1; i >= 0; i--) {
        const it = p[i]
        it.life += 1

        it.vx += wind * 0.001
        it.x += it.vx * 1.2
        it.y += it.vy * 1.2
        it.rot += it.vr

        const lifeRatio = it.life / it.maxLife
        it.alpha = 1 - lifeRatio

        if (it.y > canvas.clientHeight + 40 || it.life >= it.maxLife || it.alpha <= 0) {
          p.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(it.x, it.y)
        ctx.rotate(it.rot)

        // cánh hoa dạng ellipse + gradient hồng
        const g = ctx.createRadialGradient(0, 0, 1, 0, 0, it.size)
        g.addColorStop(0, `rgba(255, 210, 235, ${0.9 * it.alpha})`)
        g.addColorStop(1, `rgba(255, 105, 180, ${0.6 * it.alpha})`)

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.ellipse(0, 0, it.size * 0.7, it.size, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      petalsRef.current = []
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

      {/* Modal */}
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        placement='center'
        backdrop='transparent'
        classNames={{
          wrapper: 'z-[9999]',
          base: 'bg-white/10 backdrop-blur-md border-none text-white',
          header: 'justify-center',
          body: 'text-center',
          closeButton: 'z-[20]', // ✅ để nút X luôn bấm được
        }}
      >
        <ModalContent className='relative overflow-hidden p-4'>
          <>
            {/* decor */}
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

                {/* nếu bạn có gif/ảnh riêng thì thay src */}
                <Image
                  src='/assets/images/women-day.gif'
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
