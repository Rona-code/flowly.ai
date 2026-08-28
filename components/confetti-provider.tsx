'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  vr: number
  color: string
  life: number
}

const COLORS = ['#f97316', '#fb923c', '#fbbf24', '#fafafa', '#a1a1aa']

type ConfettiContextValue = {
  fire: (x?: number, y?: number) => void
}

const ConfettiContext = createContext<ConfettiContextValue>({ fire: () => {} })

export function useConfetti() {
  return useContext(ConfettiContext)
}

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const particles = particlesRef.current

    for (const p of particles) {
      p.vy += 0.15
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.vr
      p.life -= 1

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40))
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
    }

    particlesRef.current = particles.filter(
      (p) => p.life > 0 && p.y < canvas.height + 40,
    )

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop)
    } else {
      rafRef.current = null
    }
  }, [])

  const fire = useCallback(
    (x?: number, y?: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const originX = x ?? canvas.width / 2
      const originY = y ?? canvas.height / 2

      const count = 90
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 8
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 6 + Math.random() * 8,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 20,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 60 + Math.random() * 40,
        })
      }

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(loop)
      }
    },
    [loop],
  )

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <ConfettiContext.Provider value={{ fire }}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100]"
      />
    </ConfettiContext.Provider>
  )
}

/**
 * A button that fires confetti from the exact click location.
 */
export function ConfettiButton({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { fire } = useConfetti()
  return (
    <button
      className={className}
      onClick={(e) => {
        fire(e.clientX, e.clientY)
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
