"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import WaitlistForm from "./waitlist-form"
import { Badge } from "@/components/ui/badge"
import MapCanvas from "./map-canvas"

export default function AnimatedHero() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'waitlist',
          email: email,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        console.error('Failed to send email:', result.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300">
        <MapCanvas
          interactive={false}
          style="mapbox://styles/mapbox/light-v11"
          className="mix-blend-multiply opacity-[.85]"
          animate={true}
          animateMarkers={false}
        />
      </div>
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
                              <h1 className="text-5xl md:text-7xl font-sans font-light mb-8 leading-tight tracking-wide text-white drop-shadow-lg">
                      Property Management
                      <br />
                      <span className="text-white/90">Reimagined</span>
                    </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transform your property management experience with AI-powered insights, automated workflows, and seamless
            coordination between landlords, tenants, and agents.
          </p>

          {/* Waitlist Signup Form */}
          <div className="max-w-xl mx-auto mb-20">
            <WaitlistForm 
              className="flex flex-col space-y-3" 
              inputClass="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl h-14 font-light backdrop-blur-sm text-center text-lg pl-6" 
              buttonClass="w-full bg-white hover:bg-white/90 text-gray-800 px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
              placeholder="Enter your email to join waitlist" 
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-white/90">
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">1000+</span>
              <span className="text-lg">Early Adopters</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">Q2 2025</span>
              <span className="text-lg">Launch</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">Free</span>
              <span className="text-lg">Early Access</span>
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