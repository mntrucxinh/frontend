'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useTheme } from 'next-themes'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  alpha: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

export default function TetFireworksPopup() {
  const { resolvedTheme } = useTheme()
  const isTet = resolvedTheme === 'tet'

  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastSpawnRef = useRef<number>(0)

  useEffect(() => {
    setOpen(isTet)
  }, [isTet])

  useEffect(() => {
    if (!open) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      particlesRef.current = []
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

    // nền đỏ tết
    const baseR = 90,
      baseG = 0,
      baseB = 10

    const fillBackground = (alpha: number) => {
      ctx.fillStyle = `rgba(${baseR},${baseG},${baseB},${alpha})`
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    }

    const spawnBurst = (x: number, y: number) => {
      const count = Math.floor(rand(40, 80))
      const hue = Math.random() < 0.7 ? rand(35, 55) : rand(0, 20) // vàng / đỏ
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = rand(2, 6)
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.floor(rand(50, 90)),
          size: rand(1.5, 3.5),
          hue,
          alpha: 1,
        })
      }
    }

    // nền ban đầu
    fillBackground(1)

    const tick = (t: number) => {
      // trail
      fillBackground(0.16)

      const spawnEvery = 520
      if (t - lastSpawnRef.current > spawnEvery) {
        lastSpawnRef.current = t
        spawnBurst(rand(80, canvas.clientWidth - 80), rand(80, canvas.clientHeight * 0.5))
      }

      const gravity = 0.035
      const friction = 0.985

      const p = particlesRef.current
      for (let i = p.length - 1; i >= 0; i--) {
        const it = p[i]
        it.life += 1
        it.vx *= friction
        it.vy = it.vy * friction + gravity
        it.x += it.vx
        it.y += it.vy

        const lifeRatio = it.life / it.maxLife
        it.alpha = 1 - lifeRatio

        if (it.life >= it.maxLife || it.alpha <= 0) {
          p.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = `hsla(${it.hue}, 100%, 60%, ${it.alpha})`
        ctx.arc(it.x, it.y, it.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      particlesRef.current = []
      lastSpawnRef.current = 0
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Canvas: để z thấp + pointer-events-none để không chặn modal */}
      <div className='pointer-events-none fixed inset-0 z-[9000]'>
        <canvas ref={canvasRef} className='absolute inset-0' />
      </div>

      {/* Modal: nâng z cao hơn canvas */}
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
          footer: 'justify-center',
        }}
      >
        <ModalContent className='relative overflow-hidden p-3'>
          <>
            <Image
              src='/assets/images/dao.png'
              alt='Cây đào'
              width={100}
              height={100}
              className='pointer-events-none absolute -left-8 -top-4 w-44 -scale-x-100 opacity-90 md:w-52'
              priority
            />

            {/* Nội dung nằm trên ảnh */}
            <div className='relative z-10'>
              <ModalHeader>
                <h2
                  className='bg-gradient-to-r from-yellow-200 via-amber-300 to-orange-400 bg-clip-text text-center text-2xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-5xl'
                  style={{ WebkitTextStroke: '0.6px rgba(255,255,255,0.25)' }}
                >
                  Chúc Mừng Năm Mới
                </h2>
              </ModalHeader>

              <ModalBody>
                <div className='mt-1 text-sm text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] md:text-base'>
                  Năm mới bình an — vạn sự như ý!
                </div>
                <Image
                  src='/assets/images/mualan.gif'
                  alt='Tết'
                  width={200}
                  height={200}
                  className='mx-auto mb-6 mt-1'
                  priority
                />
              </ModalBody>
            </div>

            <Image
              src='/assets/images/mai.png'
              alt='Cây đào'
              width={100}
              height={100}
              className='pointer-events-none absolute -bottom-8 -right-10 w-44 opacity-90 md:w-52'
              priority
            />
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
