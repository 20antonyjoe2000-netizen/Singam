"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function RevealWrapper({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return

    const vh = window.innerHeight
    // Already in viewport — leave visible
    if (el.getBoundingClientRect().top <= vh * 0.92) return

    setRevealed(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    )

    observer.observe(el)
    // Failsafe: never leave content permanently hidden
    const timer = setTimeout(() => setRevealed(true), 2500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        "motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]",
        className
      )}
    >
      {children}
    </div>
  )
}
