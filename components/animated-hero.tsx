"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import WaitlistForm from "./waitlist-form"
import { Badge } from "@/components/ui/badge"

export default function AnimatedHero() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Create mailto link with the email address
      const subject = encodeURIComponent("New Waitlist Signup")
      const body = encodeURIComponent(`New signup for the Abode waitlist: ${email}`)
      const mailtoLink = `mailto:leon@leonhayes.com.au?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Seamless animated gradient background */}
      <div className="animated-gradient absolute inset-0"></div>

      {/* Remove the old grid structure here */}

      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 inline-block bg-white/20 text-white border-white/20 rounded-full px-4 py-1 backdrop-blur-sm">
            Coming Soon - Property Management Reimagined
          </Badge>

          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight tracking-wide text-white drop-shadow-lg">
            The Future of Property Management
            <br />
            <span className="text-white/90">Is Almost Here</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Be the first to experience the revolutionary platform that will connect tenants, property owners, and agents
            in one seamless ecosystem.
          </p>

          {/* Waitlist Signup Form (replaced with WaitlistForm) */}
          <div className="max-w-xl mx-auto mb-20">
            <WaitlistForm inputClass="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl h-14 font-light backdrop-blur-sm text-center text-lg pl-6" buttonClass="w-full bg-white hover:bg-white/90 text-gray-800 px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" placeholder="Enter your email to join waitlist" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-white/90">
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">500+</span>
              <span className="text-lg">Early Adopters</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">Q2 2024</span>
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