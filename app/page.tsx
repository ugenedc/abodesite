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
  Star,
  Menu,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import ParticleHero from "@/components/particle-hero"
import ContactForm from "@/components/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Transparent Header - Overlays on Hero */}
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-medium text-white tracking-wide">
              abode<span className="text-orange-300">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <Link href="#features" className="text-white/90 hover:text-white transition-all duration-300">
              Features
            </Link>
            <Link href="#solutions" className="text-white/90 hover:text-white transition-all duration-300">
              Solutions
            </Link>
            <Link href="#pricing" className="text-white/90 hover:text-white transition-all duration-300">
              Pricing
            </Link>
            <Link href="#contact" className="text-white/90 hover:text-white transition-all duration-300">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              className="hidden md:inline-flex text-white/90 hover:text-white hover:bg-white/10 rounded-full"
            >
              Sign In
            </Button>
            <Button className="bg-white hover:bg-white/90 text-orange-600 font-medium rounded-full px-6 shadow-lg">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Full Screen Hero Section with Map-like Particles */}
      <ParticleHero />

      {/* Solutions Section */}
      <section id="solutions" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 font-medium">Complete Solution</span>
            </div>
            <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
              End-to-end property management
              <br />
              <span className="text-gray-500">for everyone</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Abode connects all stakeholders in the property ecosystem with powerful tools designed for seamless
              collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                icon: <Home className="h-7 w-7" />,
                title: "For Tenants",
                description:
                  "Simplified rent payments, maintenance requests, and communication with property managers all in one place.",
                features: [
                  "Easy rent payments",
                  "Maintenance request tracking",
                  "Document management",
                  "Direct messaging",
                ],
                accent: "from-orange-400 to-orange-500",
                dotColor: "bg-orange-400",
              },
              {
                icon: <Building className="h-7 w-7" />,
                title: "For Owners",
                description:
                  "Complete visibility into property performance, tenant management, and financial reporting.",
                features: [
                  "Financial dashboards",
                  "Tenant screening",
                  "Maintenance oversight",
                  "Automated rent collection",
                ],
                accent: "from-orange-500 to-pink-400",
                dotColor: "bg-orange-500",
              },
              {
                icon: <Key className="h-7 w-7" />,
                title: "For Agents",
                description: "Streamlined property listings, client management, and transaction processing tools.",
                features: ["Listing management", "Client CRM", "Transaction tracking", "Commission reporting"],
                accent: "from-pink-400 to-pink-500",
                dotColor: "bg-pink-400",
              },
            ].map((solution, index) => (
              <Card
                key={index}
                className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg"
              >
                <CardHeader className="pt-10 pb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${solution.accent}/10 rounded-2xl flex items-center justify-center text-gray-600 mb-8 group-hover:scale-105 transition-transform duration-300`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 font-medium">Features</span>
            </div>
            <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
              Powerful tools for
              <br />
              <span className="text-gray-500">property management</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Everything you need to manage properties efficiently in one integrated platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="h-6 w-6" />,
                title: "Tenant Management",
                description: "Comprehensive tenant profiles, screening, and communication tools.",
                accent: "from-orange-400 to-orange-500",
              },
              {
                icon: <Building className="h-6 w-6" />,
                title: "Property Portfolio",
                description: "Organize and track all properties with detailed information and analytics.",
                accent: "from-orange-500 to-pink-400",
              },
              {
                icon: <Calendar className="h-6 w-6" />,
                title: "Rent Collection",
                description: "Automated rent collection, payment tracking, and financial reporting.",
                accent: "from-pink-400 to-pink-500",
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Financial Analytics",
                description: "Real-time financial insights with customizable reports and forecasting.",
                accent: "from-orange-400 to-orange-500",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Document Security",
                description: "Secure storage for leases, contracts, and important property documents.",
                accent: "from-orange-500 to-pink-400",
              },
              {
                icon: <Key className="h-6 w-6" />,
                title: "Listing Management",
                description: "Create, publish, and manage property listings across multiple platforms.",
                accent: "from-pink-400 to-pink-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 rounded-2xl group shadow-sm hover:shadow-md p-8"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.accent}/10 rounded-xl flex items-center justify-center text-gray-600 mb-6 group-hover:scale-105 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full Circle Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Full Circle</span>
              </div>
              <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
                The complete property
                <br />
                <span className="text-gray-500">ecosystem</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Abode connects all stakeholders in a seamless workflow, creating a unified experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400/10 to-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Home className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Tenants</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Find properties, apply online, pay rent, and request maintenance all in one platform.
                </p>
              </div>

              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/10 to-pink-400/10 rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Building className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Owners</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Manage properties, track performance, collect rent, and communicate with tenants effortlessly.
                </p>
              </div>

              <div className="group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400/10 to-pink-500/10 rounded-3xl flex items-center justify-center text-pink-500 mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Key className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">Agents</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  List properties, manage clients, process applications, and close deals seamlessly.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-600 mb-10 font-light">
                Experience the power of a truly connected property management platform
              </p>
              <Button className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white rounded-full px-10 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gray-50/30">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-100 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 font-medium">Pricing</span>
            </div>
            <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
              Choose your
              <br />
              <span className="text-gray-500">plan</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Flexible pricing options for properties of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$29",
                description: "Perfect for individual property owners",
                features: ["Up to 5 properties", "Basic tenant management", "Rent collection", "Email support"],
                popular: false,
              },
              {
                name: "Professional",
                price: "$79",
                description: "Ideal for small to medium agencies",
                features: [
                  "Up to 50 properties",
                  "Advanced tenant screening",
                  "Financial reporting",
                  "Priority support",
                  "Listing syndication",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large property management companies",
                features: [
                  "Unlimited properties",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SLA guarantee",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 bg-white transition-all duration-500 rounded-2xl shadow-sm hover:shadow-lg ${plan.popular ? "ring-1 ring-gray-200" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full px-4 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pb-6 pt-10">
                  <CardTitle className="text-2xl font-light text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-500 text-lg font-light">/month</span>}
                  </div>
                  <CardDescription className="text-base text-gray-500 font-light">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 pb-10">
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-4 text-base rounded-full transition-all duration-300 font-medium ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 font-medium">Contact Us</span>
            </div>
            <h2 className="text-5xl font-light mb-8 text-gray-900 leading-tight">
              Get in touch
              <br />
              <span className="text-gray-500">with our team</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Ready to transform your property management? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-8">Let's start a conversation</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed mb-12">
                  Whether you're a property owner, tenant, or agent, we're here to help you discover how Abode can
                  streamline your property management experience.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Email us</h4>
                    <p className="text-gray-600 font-light">leon@leonhayes.com.au</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-pink-400/10 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Call us</h4>
                    <p className="text-gray-600 font-light">+61 (0) 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400/10 to-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Visit us</h4>
                    <p className="text-gray-600 font-light">
                      Level 1, 123 Collins Street
                      <br />
                      Melbourne, VIC 3000
                      <br />
                      Australia
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Response time</h4>
                <p className="text-gray-600 font-light">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-orange-400 to-pink-400">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-5xl font-light text-white mb-8 leading-tight">
            Ready to transform your
            <br />
            <span className="text-white/80">property management?</span>
          </h2>
          <p className="text-xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Join thousands of property managers, owners, and tenants already using Abode
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full h-14 font-light"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100 whitespace-nowrap rounded-full h-14 px-8 font-medium">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-base text-white/80 mt-8 font-light">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-medium text-gray-800 tracking-wide">
                  abode
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">.</span>
                </span>
              </div>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                The complete property management platform for tenants, owners, and agents.
              </p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-6 text-lg text-gray-800">Product</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-6 text-lg text-gray-800">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-6 text-lg text-gray-800">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors text-base">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-16 pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-base">© {new Date().getFullYear()} Abode. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-base">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-base">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-base">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
