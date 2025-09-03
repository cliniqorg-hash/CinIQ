'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'

type AnimatedBackgroundProps = {
  className?: string
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const translateSmallX = useTransform(springX, [0, 1], [-8, 8])
  const translateSmallY = useTransform(springY, [0, 1], [-8, 8])
  const translateMedX = useTransform(springX, [0, 1], [-16, 16])
  const translateMedY = useTransform(springY, [0, 1], [-16, 16])
  const translateLargeX = useTransform(springX, [0, 1], [-22, 22])
  const translateLargeY = useTransform(springY, [0, 1], [-22, 22])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY])

  // Deterministic small particles positions
  const particles = useMemo(() => {
    const list: Array<{ left: string; top: string; size: number; delay: number; duration: number }> = []
    const seed = 42
    let x = seed
    function rnd() {
      x ^= x << 13
      x ^= x >> 17
      x ^= x << 5
      return Math.abs(x) / 0xffffffff
    }
    for (let i = 0; i < 24; i++) {
      const left = `${Math.floor(rnd() * 100)}%`
      const top = `${Math.floor(rnd() * 100)}%`
      const size = 2 + Math.floor(rnd() * 4)
      const delay = rnd() * 5
      const duration = 6 + rnd() * 6
      list.push({ left, top, size, delay, duration })
    }
    return list
  }, [])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Soft radial glow */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl"
        style={{ x: translateLargeX, y: translateLargeY }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-[-80px] right-[-60px] w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
        style={{ x: translateMedX, y: translateMedY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        className="absolute top-10 right-20 w-24 h-24 rounded-full bg-white/10 border border-white/20"
        style={{ x: translateSmallX, y: translateSmallY }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-32 left-16 w-16 h-16 rounded-full bg-white/10 border border-white/20"
        style={{ x: translateMedX, y: translateMedY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-24 left-1/2 -ml-10 w-20 h-20 rounded-full bg-white/10 border border-white/20"
        style={{ x: translateSmallX, y: translateSmallY }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Tiny particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full bg-white/30"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [-8, 8, -8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}


