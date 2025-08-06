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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with interactive map */}
      <div className="absolute inset-0 z-0">
        <MapCanvas className="w-full h-full" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 bg-black/60 min-h-screen">
        <div className="container mx-auto px-8 py-32 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight tracking-wide text-white drop-shadow-lg">
              Property Management
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 drop-shadow-none">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light">
              Transform your property management experience with AI-powered insights, automated workflows, and seamless
              coordination between landlords, tenants, and agents.
            </p>

            {/* Waitlist Form */}
            <WaitlistForm
              className="flex flex-col sm:flex-row gap-4 max-w-lg"
              inputClass="bg-white/90 border-white/20 text-black placeholder:text-gray-500 rounded-full h-16 px-6 font-light text-lg flex-grow"
              buttonClass="bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-500 hover:to-orange-500 text-white whitespace-nowrap rounded-full h-16 px-8 font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              placeholder="Enter your email address"
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Early access pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>No commitments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}