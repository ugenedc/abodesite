"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  blurAmount?: number
  fadeDirection?: "up" | "down" | "left" | "right" | "none"
  duration?: number
}

export default function ScrollSection({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  blurAmount = 10,
  fadeDirection = "up",
  duration = 800,
}: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isVisible) {
          // Delay the animation start if specified
          setTimeout(() => {
            setIsVisible(true)
            setIsAnimating(true)

            // Reset animating state after animation completes
            setTimeout(() => {
              setIsAnimating(false)
            }, duration)
          }, delay)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before the element is in view
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isVisible, delay, threshold, duration])

  // Calculate transform values based on direction
  const getInitialTransform = () => {
    switch (fadeDirection) {
      case "up":
        return "translateY(40px)"
      case "down":
        return "translateY(-40px)"
      case "left":
        return "translateX(40px)"
      case "right":
        return "translateX(-40px)"
      default:
        return "none"
    }
  }

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-all relative",
        isAnimating && "will-change-transform will-change-opacity will-change-filter",
        className,
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0)" : `blur(${blurAmount}px)`,
        transform: isVisible ? "none" : getInitialTransform(),
        transition: `opacity ${duration}ms ease-out, filter ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  )
}
