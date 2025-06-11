"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Initialize smooth mouse to center when canvas resizes
      smoothMouseRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Stable mouse tracking - no state updates, just ref updates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize smooth mouse position
    smoothMouseRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }

    // Particle system
    const particles: Array<{
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      opacity: number
      color: string
      phase: number
      speed: number
      isHub: boolean
      connections: number[]
    }> = []

    // Soft color palette
    const colors = [
      "rgba(255, 154, 108, 0.7)",
      "rgba(255, 138, 128, 0.6)",
      "rgba(255, 120, 148, 0.7)",
      "rgba(255, 102, 168, 0.6)",
      "rgba(255, 255, 255, 0.5)",
    ]

    // Create particles
    const numParticles = 24
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const isHub = Math.random() > 0.75

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: isHub ? Math.random() * 2.5 + 2.5 : Math.random() * 1.5 + 1,
        opacity: isHub ? Math.random() * 0.3 + 0.6 : Math.random() * 0.2 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0005 + 0.0005, // For ambient movement
        isHub,
        connections: [],
      })
    }

    // Create connections
    particles.forEach((particle, index) => {
      const maxConnections = particle.isHub ? 3 : 2
      let connectionCount = 0

      particles.forEach((other, otherIndex) => {
        if (index !== otherIndex && connectionCount < maxConnections) {
          const distance = Math.sqrt(
            Math.pow(particle.baseX - other.baseX, 2) + Math.pow(particle.baseY - other.baseY, 2),
          )

          if (distance < 180 && Math.random() > 0.65) {
            particle.connections.push(otherIndex)
            connectionCount++
          }
        }
      })
    })

    // Smooth easing function
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    // Animation loop - stable, no dependencies
    const animate = () => {
      // Smooth mouse interpolation (more noticeable)
      const mouseEasing = 0.05 // Increased from 0.015
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * mouseEasing
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * mouseEasing

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#FF9A6C")
      gradient.addColorStop(0.35, "#FF8A80")
      gradient.addColorStop(0.65, "#FF7894")
      gradient.addColorStop(1, "#FF66A8")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.0008

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Gentle pulsing
        particle.phase += 0.006
        const pulse = Math.sin(particle.phase) * 0.15 + 0.85

        // Calculate mouse influence (more noticeable)
        const mouseDistance = Math.sqrt(
          Math.pow(smoothMouseRef.current.x - particle.baseX, 2) +
            Math.pow(smoothMouseRef.current.y - particle.baseY, 2),
        )

        const influenceRadius = 250 // Increased from 150
        let offsetX = 0
        let offsetY = 0

        // Add ambient movement even when mouse is far away
        const ambientX = Math.sin(time * 0.5 + particle.phase) * 2
        const ambientY = Math.cos(time * 0.3 + particle.phase * 2) * 2

        if (mouseDistance < influenceRadius) {
          const influence = (influenceRadius - mouseDistance) / influenceRadius
          const smoothInfluence = easeInOutQuad(influence) * 1.5 // Amplified by 50%
          const maxOffset = 20 // Increased from 6

          const angle = Math.atan2(smoothMouseRef.current.y - particle.baseY, smoothMouseRef.current.x - particle.baseX)

          offsetX = Math.cos(angle) * smoothInfluence * maxOffset
          offsetY = Math.sin(angle) * smoothInfluence * maxOffset
        }

        // Combine mouse influence with ambient movement
        offsetX += ambientX
        offsetY += ambientY

        // Smooth position interpolation
        const targetX = particle.baseX + offsetX
        const targetY = particle.baseY + offsetY
        const lerpSpeed = 0.04 // Increased from 0.018

        particle.x += (targetX - particle.x) * lerpSpeed
        particle.y += (targetY - particle.y) * lerpSpeed

        // Draw connections first
        particle.connections.forEach((connectionIndex) => {
          const connectedParticle = particles[connectionIndex]
          if (connectedParticle) {
            const connectionDistance = Math.sqrt(
              Math.pow(particle.x - connectedParticle.x, 2) + Math.pow(particle.y - connectedParticle.y, 2),
            )

            if (connectionDistance < 200) {
              ctx.save()

              const lineOpacity = 0.12 * (1 - connectionDistance / 200) * pulse
              const lineGradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                connectedParticle.x,
                connectedParticle.y,
              )
              lineGradient.addColorStop(0, `rgba(255, 154, 108, ${lineOpacity})`)
              lineGradient.addColorStop(0.5, `rgba(255, 120, 148, ${lineOpacity * 1.1})`)
              lineGradient.addColorStop(1, `rgba(255, 102, 168, ${lineOpacity})`)

              ctx.strokeStyle = lineGradient
              ctx.lineWidth = particle.isHub ? 1 : 0.7
              ctx.lineCap = "round"

              // Gentle dash animation
              ctx.setLineDash([3, 6])
              ctx.lineDashOffset = time * 12

              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(connectedParticle.x, connectedParticle.y)
              ctx.stroke()

              ctx.restore()
            }
          }
        })

        // Draw particle
        ctx.save()

        // Soft glow
        const glowSize = particle.isHub ? 15 : 10
        ctx.shadowBlur = glowSize
        ctx.shadowColor = particle.color

        // Hub outer ring
        if (particle.isHub) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 1.6 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, "0.06)")
          ctx.fill()
        }

        // Main particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Inner highlight
        ctx.beginPath()
        ctx.arc(particle.x - particle.size * 0.2, particle.y - particle.size * 0.2, particle.size * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)"
        ctx.fill()

        ctx.restore()
      })

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, []) // No dependencies - stable animation loop

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/6 to-pink-200/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-200/6 to-orange-200/6 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 inline-block bg-white/20 text-white border-white/20 rounded-full px-4 py-1 backdrop-blur-sm">
            Property Management Reimagined
          </Badge>

          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight tracking-wide text-white drop-shadow-lg">
            Complete Property Management
            <br />
            <span className="text-white/90">For Everyone</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            The only platform that connects tenants, property owners, and agents in one seamless ecosystem. Manage
            everything from listings to rent collection in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-orange-600 px-10 py-6 text-lg font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/60 px-10 py-6 text-lg font-medium rounded-full backdrop-blur-sm transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-white/90">
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">10k+</span>
              <span className="text-lg">Properties</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">5k+</span>
              <span className="text-lg">Users</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">4.9★</span>
              <span className="text-lg">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

// Badge component for the hero section
function Badge({ children, className, ...props }) {
  return (
    <span className={`px-4 py-1 text-sm font-medium rounded-full ${className}`} {...props}>
      {children}
    </span>
  )
}
