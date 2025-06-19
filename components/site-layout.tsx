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
  X,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import ContactForm from "@/components/contact-form"
import ScrollSection from "@/components/scroll-section"
import Image from "next/image"
import WaitlistForm from "@/components/waitlist-form"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  if (isStudio) {
    return <>{children}</>
  }

  const navBg = pathname === "/" && !isScrolled
    ? "bg-white/10 backdrop-blur-md border-b border-white/30"
    : "bg-white/95 backdrop-blur-md shadow-sm"
  const navText = pathname === "/" && !isScrolled
    ? "text-white"
    : "text-gray-800"

  const scrollToContact = () => {
    if (pathname === "/") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = "/#contact"
    }
  }

  const navigateToSection = (sectionId: string) => {
    if (pathname === "/") {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${sectionId}`
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  const scrollToContactMobile = () => {
    scrollToContact()
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen">
      {/* Dynamic Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <span className="block w-32 h-10 relative">
                <Image
                  src={pathname === "/" && !isScrolled ? "/logo-white.svg" : "/logo-color.svg"}
                  alt="Abode Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => navigateToSection("features")}
              className={`transition-all duration-300 ${navText}`}
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection("solutions")}
              className={`transition-all duration-300 ${navText}`}
            >
              Solutions
            </button>
            <button
              onClick={() => navigateToSection("pricing")}
              className={`transition-all duration-300 ${navText}`}
            >
              Pricing
            </button>
            <Link
              href="/team"
              className={`transition-all duration-300 ${navText} hover:text-purple-500`}
            >
              Team
            </Link>
            <Link
              href="/blog"
              className={`transition-all duration-300 ${navText}`}
            >
              Blog
            </Link>
            <button
              onClick={scrollToContact}
              className={`transition-all duration-300 ${navText}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-6">
            <Button
              onClick={scrollToContact}
              className={`font-medium rounded-full px-6 shadow-lg transition-all duration-300 ${
                pathname === "/" && !isScrolled
                  ? "bg-white text-orange-400"
                  : "bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-500 hover:to-orange-500 text-white"
              }`}
            >
              Join Waitlist
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden rounded-full transition-all duration-300 ${navText} z-60`}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-purple-800/95 to-orange-800/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Menu Header */}
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/logo-color.svg"
                  alt="Abode Logo"
                  width={120}
                  height={32}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-8 space-y-6">
            <button
              onClick={() => navigateToSection("features")}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Features
            </button>
            
            <button
              onClick={() => navigateToSection("solutions")}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Solutions
            </button>
            
            <button
              onClick={() => navigateToSection("pricing")}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Pricing
            </button>
            
            <Link
              href="/team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Team
            </Link>
            
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Blog
            </Link>
            
            <button
              onClick={scrollToContactMobile}
              className="flex items-center w-full text-left text-gray-800 hover:text-purple-600 transition-colors duration-200 text-lg font-light group"
            >
              <span className="w-2 h-2 bg-orange-600 rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></span>
              Contact
            </button>
          </nav>

          {/* CTA Section */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-gradient-to-r from-purple-400 to-orange-400 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-medium mb-2">Ready to get started?</h3>
              <p className="text-white/90 text-sm mb-4 font-light">Join the waitlist for early access.</p>
              <Button
                onClick={scrollToContactMobile}
                className="w-full bg-white hover:bg-white/90 text-purple-600 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add top padding equal to nav height (h-20 = 5rem = 80px) */}
      <main>{children}</main>

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

          <div className="flex w-full justify-center">
            <div className="flex flex-row gap-4 w-full max-w-lg">
              <WaitlistForm
                className="w-full flex sm:flex-row items-center gap-4"
                inputClass="bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full h-14 font-light pl-6 flex-grow"
                buttonClass="bg-white text-gray-900 hover:bg-gray-100 whitespace-nowrap rounded-full h-14 px-8 font-medium flex-shrink-0"
                placeholder="Enter your email"
              />
            </div>
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