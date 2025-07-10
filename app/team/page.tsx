"use client"

import { ArrowLeft, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ScrollSection from "@/components/scroll-section"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Leon Hayes",
      title: "Founder & CEO, Abode AI",
      description: "Leon Hayes is a serial entrepreneur and technology visionary with a passion for transforming the real estate experience. As the founder and CEO of Abode AI, Leon brings decades of experience across property, technology, and venture building to reimagine how homes are managed and lived in. With a sharp eye for inefficiencies in traditional property management, Leon set out to build a platform that empowers landlords, tenants, and property managers through automation, AI, and world-class user experience.",
      photo: "/LeonPhoto.jpg",
      linkedin: "https://www.linkedin.com/in/leonnhayes/",
      email: "leon@abode.com",
      gradient: "from-purple-500/80 to-purple-600/80",
      delay: 0
    },
    {
      name: "Sarah Chen",
      title: "CEO & Co-Founder",
      description: "Former VP of Product at PropTech unicorn. Stanford MBA with 12+ years revolutionizing real estate technology. Passionate about creating seamless experiences.",
      initials: "SC",
      linkedin: "#",
      email: "sarah@abode.com",
      gradient: "from-purple-400/80 to-purple-500/80",
      delay: 100
    },
    {
      name: "Marcus Rodriguez",
      title: "CTO & Co-Founder",
      description: "Ex-Google Senior Engineer with expertise in scalable systems. MIT Computer Science. Led engineering teams building products used by millions worldwide.",
      initials: "MR",
      linkedin: "#",
      email: "marcus@abode.com",
      gradient: "from-purple-500/80 to-orange-400/80",
      delay: 200
    },
    {
      name: "Emily Watson",
      title: "Head of Design",
      description: "Award-winning UX designer from Airbnb. Specializes in creating intuitive interfaces that delight users. 8+ years crafting beautiful digital experiences.",
      initials: "EW",
      linkedin: "#",
      email: "emily@abode.com",
      gradient: "from-orange-400/80 to-orange-500/80",
      delay: 300
    },
    {
      name: "David Kim",
      title: "VP of Engineering",
      description: "Full-stack architect with deep PropTech experience. Previously at Zillow and Compass. Expert in building robust, scalable platforms for real estate.",
      initials: "DK",
      linkedin: "#",
      email: "david@abode.com",
      gradient: "from-purple-400/80 to-purple-600/80",
      delay: 400
    },
    {
      name: "Jessica Park",
      title: "Head of Growth",
      description: "Growth marketing expert from Stripe. Data-driven strategist who helped scale multiple B2B SaaS companies from startup to IPO. UCLA MBA.",
      initials: "JP",
      linkedin: "#",
      email: "jessica@abode.com",
      gradient: "from-purple-600/80 to-orange-400/80",
      delay: 500
    },
    {
      name: "Alex Thompson",
      title: "Head of Customer Success",
      description: "Property management veteran with 15+ years in the industry. Former operations director at major property management firm. Customer-obsessed leader.",
      initials: "AT",
      linkedin: "#",
      email: "alex@abode.com",
      gradient: "from-orange-400/80 to-orange-600/80",
      delay: 600
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-orange-600/20"></div>
        <div className="container mx-auto px-8 relative z-10">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white border border-white/20 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span className="text-sm font-medium">Meet the Team</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight text-white drop-shadow-lg">
                The minds behind
                <br />
                <span className="text-white/90">the revolution</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
                We're a passionate team of property tech veterans, designers, and engineers united by a shared vision to transform how people experience property management.
              </p>
            </div>
          </ScrollSection>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      {/* Team Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollSection key={index} delay={member.delay} blurAmount={3} fadeDirection="up">
                <Card className="group team-card border-0 bg-white hover:bg-gray-50/50 transition-all duration-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-2">
                  <CardContent className="p-0 team-card-content rounded-3xl overflow-hidden">
                    {/* Avatar Container */}
                    <div className="relative h-80 overflow-hidden rounded-t-3xl">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          style={{ objectPosition: 'center 20%' }}
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} group-hover:scale-105 transition-transform duration-700`}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 group-hover:scale-110 transition-transform duration-500">
                              <span className="text-4xl font-light text-white drop-shadow-lg">
                                {member.initials}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Floating particles for visual interest */}
                      <div className="absolute top-6 left-6 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
                      <div className="absolute top-12 right-8 w-2 h-2 bg-white/40 rounded-full animate-float-delayed"></div>
                      <div className="absolute bottom-8 left-8 w-3 h-3 bg-white/25 rounded-full animate-float"></div>
                      
                                             {/* Social Links Overlay */}
                       <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                         <Button
                           size="icon"
                           variant="ghost"
                           className="w-10 h-10 bg-white/90 backdrop-blur-sm text-gray-500 hover:text-purple-500 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                           asChild
                         >
                           <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                             <Linkedin className="w-4 h-4 team-social-icon" />
                           </Link>
                         </Button>
                         <Button
                           size="icon"
                           variant="ghost"
                           className="w-10 h-10 bg-white/90 backdrop-blur-sm text-gray-500 hover:text-orange-500 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                           asChild
                         >
                           <Link href={`mailto:${member.email}`}>
                             <Mail className="w-4 h-4 team-social-icon" />
                           </Link>
                         </Button>
                       </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${member.gradient} text-white text-sm font-medium mb-4`}>
                          {member.title}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed font-light text-base">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-orange-600/10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <ScrollSection blurAmount={4} fadeDirection="up">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-white leading-tight drop-shadow-lg">
                Ready to join our mission?
              </h2>
              <p className="text-xl text-white/90 mb-10 font-light leading-relaxed drop-shadow-md">
                We're always looking for exceptional talent to help us revolutionize property management.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-purple-600 px-10 py-6 text-lg font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                  asChild
                >
                  <Link href="/#contact">
                    Get in Touch
                    <ArrowLeft className="ml-3 h-5 w-5 rotate-180" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/60 px-10 py-6 text-lg font-medium rounded-full backdrop-blur-sm transition-all duration-300"
                  asChild
                >
                  <Link href="/#">
                    View Open Roles
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollSection>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  )
} 