"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Menu,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import ContactForm from "@/components/contact-form"
import ScrollSection from "@/components/scroll-section"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  useEffect(() => {
    if (isStudio) return

    const handleScroll = () => {
      // The header should be transparent only when at the top of the homepage.
      const isHomePageAtTop = pathname === "/" && window.scrollY < 50
      setIsScrolled(!isHomePageAtTop)
    }

    window.addEventListener("scroll", handleScroll)
    // Set initial state correctly on load & navigation
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, isStudio])

  if (isStudio) {
    return <>{children}</>
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/10 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <span
                className={`text-2xl font-medium tracking-wide transition-colors duration-300 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                abode<span className="text-orange-400">.</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/#features"
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Features
            </Link>
            <Link
              href="/#solutions"
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Solutions
            </Link>
            <Link
              href="/#pricing"
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Blog
            </Link>
            <button
              onClick={scrollToContact}
              className={`transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-6">
            <Button
              onClick={scrollToContact}
              className={`font-medium rounded-full px-6 shadow-lg transition-all duration-300 ${
                isScrolled
                  ? "bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-500 hover:to-orange-500 text-white"
                  : "bg-white hover:bg-white/90 text-orange-400"
              }`}
            >
              Join Waitlist
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden rounded-full transition-all duration-300 ${
                isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Add top padding equal to nav height (h-20 = 5rem = 80px) */}
      <main className="pt-20 md:pt-20">{children}</main>

      {/* Footer CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-8">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-light mb-8 leading-tight">
                Join the Abode waitlist
                <br />
                <span className="text-gray-500">and be the first to know when we launch</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Get exclusive access to early bird pricing and special features.
              </p>
            </div>
          </ScrollSection>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement
                const email = emailInput.value
                if (email) {
                  const subject = encodeURIComponent("New Waitlist Signup")
                  const body = encodeURIComponent(`New signup for the Abode waitlist: ${email}`)
                  window.location.href = `mailto:leon@leonhayes.com.au?subject=${subject}&body=${body}`
                  emailInput.value = ""
                }
              }}
              className="flex flex-col sm:flex-row gap-6 w-full"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full h-14 font-light pl-6"
                required
              />
              <Button
                type="submit"
                className="bg-white text-gray-900 hover:bg-gray-100 whitespace-nowrap rounded-full h-14 px-8 font-medium"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <ScrollSection delay={800} blurAmount={2} fadeDirection="up">
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <p className="text-gray-500 leading-relaxed">
                By joining the waitlist, you agree to our{" "}
                <Link href="#" className="text-white hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-white hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>
    </div>
  )
} 