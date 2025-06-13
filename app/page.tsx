"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Home,
  Users,
  Building,
  Key,
  BarChart3,
  Shield,
  Calendar,
  Menu,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  Gift,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import ScrollSection from "@/components/scroll-section"
import MapHero from "@/components/map-hero"
import { useEffect, useState } from "react"
import WaitlistForm from "@/components/waitlist-form"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist signup
    setEmail("")
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300">
      <MapHero />

      {/* Hero Waitlist Form */}
      <div className="flex flex-col items-center justify-center mt-8">
        <WaitlistForm />
      </div>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Coming Soon</span>
              </div>
              <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
                Revolutionary property management
                <br />
                <span className="text-gray-500">for everyone</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Abode will connect all stakeholders in the property ecosystem with powerful tools designed for seamless
                collaboration
              </p>
            </div>
          </ScrollSection>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: <Home className="h-7 w-7 text-white" />,
                title: "For Tenants",
                description:
                  "Simplified rent payments, maintenance requests, and communication with property managers all in one place.",
                features: [
                  "Easy rent payments",
                  "Maintenance request tracking",
                  "Document management",
                  "Direct messaging",
                ],
                accent: "from-purple-400 to-purple-500",
                dotColor: "bg-purple-400",
                delay: 200,
              },
              {
                icon: <Building className="h-7 w-7 text-white" />,
                title: "For Owners",
                description:
                  "Complete visibility into property performance, tenant management, and financial reporting.",
                features: [
                  "Financial dashboards",
                  "Tenant screening",
                  "Maintenance oversight",
                  "Automated rent collection",
                ],
                accent: "from-purple-500 to-orange-400",
                dotColor: "bg-purple-500",
                delay: 400,
              },
              {
                icon: <Key className="h-7 w-7 text-white" />,
                title: "For Agents",
                description: "Streamlined property listings, client management, and transaction processing tools.",
                features: ["Listing management", "Client CRM", "Transaction tracking", "Commission reporting"],
                accent: "from-orange-400 to-orange-500",
                dotColor: "bg-orange-400",
                delay: 600,
              },
            ].map((solution, index) => (
              <ScrollSection key={index} delay={solution.delay} blurAmount={2} fadeDirection="up">
                <Card className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg">
                  <CardHeader className="pt-10 pb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${solution.accent} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {solution.icon}
                    </div>
                    <CardTitle className="text-2xl font-light text-gray-900 mb-4">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-500 text-base leading-relaxed font-light">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-10">
                    <ul className="space-y-4">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className={`w-1.5 h-1.5 ${solution.dotColor} rounded-full mr-4 flex-shrink-0`}></div>
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-8">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Planned Features</span>
              </div>
              <h2 className="text-5xl font-light mb-8 leading-tight text-white drop-shadow-lg">
                Powerful tools for
                <br />
                <span className="text-white/80 drop-shadow-md">modern property management</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
                Everything you'll need to manage properties efficiently in one integrated platform
              </p>
            </div>
          </ScrollSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="h-6 w-6 text-white" />,
                title: "Tenant Management",
                description: "Comprehensive tenant profiles, screening, and communication tools.",
                accent: "from-purple-400 to-purple-500",
                delay: 100,
              },
              {
                icon: <Building className="h-6 w-6 text-white" />,
                title: "Property Portfolio",
                description: "Organize and track all properties with detailed information and analytics.",
                accent: "from-purple-500 to-orange-400",
                delay: 200,
              },
              {
                icon: <Calendar className="h-6 w-6 text-white" />,
                title: "Rent Collection",
                description: "Automated rent collection, payment tracking, and financial reporting.",
                accent: "from-orange-400 to-orange-500",
                delay: 300,
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-white" />,
                title: "Financial Analytics",
                description: "Real-time financial insights with customizable reports and forecasting.",
                accent: "from-purple-400 to-purple-500",
                delay: 400,
              },
              {
                icon: <Shield className="h-6 w-6 text-white" />,
                title: "Document Security",
                description: "Secure storage for leases, contracts, and important property documents.",
                accent: "from-purple-500 to-orange-400",
                delay: 500,
              },
              {
                icon: <Key className="h-6 w-6 text-white" />,
                title: "Listing Management",
                description: "Create, publish, and manage property listings across multiple platforms.",
                accent: "from-orange-400 to-orange-500",
                delay: 600,
              },
            ].map((feature, index) => (
              <ScrollSection key={index} delay={feature.delay} blurAmount={2} fadeDirection="up">
                <Card className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 rounded-2xl group shadow-sm hover:shadow-md p-8">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.accent} rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{feature.description}</p>
                </Card>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* Full Circle Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollSection blurAmount={4} fadeDirection="up">
              <div className="text-center mb-20">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 font-medium">The Vision</span>
                </div>
                <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
                  The complete property
                  <br />
                  <span className="text-gray-500">ecosystem</span>
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                  Abode will connect all stakeholders in a seamless workflow, creating a unified experience
                </p>
              </div>
            </ScrollSection>

            <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
              <ScrollSection delay={200} blurAmount={2} fadeDirection="up">
                <div className="group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Home className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-4">Tenants</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Find properties, apply online, pay rent, and request maintenance all in one platform.
                  </p>
                </div>
              </ScrollSection>

              <ScrollSection delay={400} blurAmount={2} fadeDirection="up">
                <div className="group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-orange-400 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Building className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-4">Owners</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Manage properties, track performance, collect rent, and communicate with tenants effortlessly.
                  </p>
                </div>
              </ScrollSection>

              <ScrollSection delay={600} blurAmount={2} fadeDirection="up">
                <div className="group">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Key className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-4">Agents</h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    List properties, manage clients, process applications, and close deals seamlessly.
                  </p>
                </div>
              </ScrollSection>
            </div>

            <ScrollSection delay={800} blurAmount={2} fadeDirection="up">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-10 font-light">
                  Be among the first to experience the future of property management
                </p>
                <Button className="bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-500 hover:to-orange-500 text-white rounded-full px-10 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Join the Waitlist
                </Button>
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>

      {/* Pricing Section - Refactored for Waitlist */}
      <section id="pricing" className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-8">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Early Adopter Benefits</span>
              </div>
              <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
                Join our waitlist for
                <br />
                <span className="text-gray-500">exclusive launch benefits</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Be among the first to experience Abode and enjoy special introductory pricing and perks
              </p>
            </div>
          </ScrollSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Founding Member",
                price: "Free",
                description: "First 100 users on our waitlist",
                features: [
                  "3 months free access",
                  "Up to 5 properties",
                  "Early access to new features",
                  "Dedicated onboarding",
                  "Access to the Abode Academy",
                ],
                icon: <Gift className="h-6 w-6" />,
                popular: false,
                delay: 200,
              },
              {
                name: "Early Adopter",
                price: "50% Off",
                description: "Limited time launch pricing",
                features: [
                  "Lifetime discount",
                  "Priority feature requests",
                  "Extended free trial",
                  "Premium support",
                  "Early access to integrations",
                ],
                icon: <Sparkles className="h-6 w-6" />,
                popular: true,
                delay: 400,
              },
              {
                name: "Enterprise Preview",
                price: "Custom",
                description: "For larger organizations",
                features: [
                  "Custom implementation",
                  "Dedicated success manager",
                  "Tailored onboarding",
                  "API access",
                  "Custom integrations",
                ],
                icon: <Building className="h-6 w-6" />,
                popular: false,
                delay: 600,
              },
            ].map((plan, index) => (
              <ScrollSection key={index} delay={plan.delay} blurAmount={3} fadeDirection="up">
                <Card
                  className={`relative border-0 bg-white transition-all duration-500 rounded-2xl shadow-sm hover:shadow-lg ${plan.popular ? "ring-1 ring-gray-200" : ""} h-full flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-400 to-orange-400 text-white rounded-full px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pb-6 pt-10">
                    <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-orange-400/10 rounded-full flex items-center justify-center text-purple-500">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-light text-gray-900 mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                    </div>
                    <CardDescription className="text-base text-gray-500 font-light">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-10 flex flex-col flex-grow">
                    <ul className="space-y-4 mb-10 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-purple-500 mr-3 flex-shrink-0" />
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <WaitlistForm
                      className="!bg-gradient-to-r !from-purple-400 !to-orange-400"
                      inputClass="w-full !bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      buttonClass="w-full py-4 text-base rounded-full bg-gradient-to-r from-purple-400 to-orange-400 text-white"
                      placeholder="Enter your email"
                    />
                  </CardContent>
                </Card>
              </ScrollSection>
            ))}
          </div>

          <ScrollSection delay={800} blurAmount={2} fadeDirection="up">
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-600 font-medium">Limited Time Offer</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Our early adopter benefits are only available for a limited time before our official launch. Join now to
                lock in your special pricing and exclusive perks.
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Get in Touch</span>
              </div>
              <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
                Questions about
                <br />
                <span className="text-gray-500">our launch?</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                We'd love to hear from you and answer any questions about Abode's upcoming launch.
              </p>
            </div>
          </ScrollSection>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <ScrollSection delay={200} blurAmount={3} fadeDirection="left">
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-light text-gray-900 mb-8">Let's start a conversation</h3>
                  <p className="text-lg text-gray-600 font-light leading-relaxed mb-12">
                    Whether you're a property owner, tenant, or agent, we're here to help you understand how Abode will
                    transform your property management experience.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400/10 to-orange-400/10 rounded-xl flex items-center justify-center text-purple-500 flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Email us</h4>
                      <p className="text-gray-600 font-light">leon@leonhayes.com.au</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-orange-400/10 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Call us</h4>
                      <p className="text-gray-600 font-light">123-456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400/10 to-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Visit us</h4>
                      <p className="text-gray-600 font-light">123 Main St, Anytown, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>

            {/* Contact Form */}
            <ScrollSection delay={400} blurAmount={3} fadeDirection="right">
              <ContactForm />
            </ScrollSection>
          </div>
        </div>
      </section>
    </div>
  )
}
