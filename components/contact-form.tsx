"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || "Contact Form Submission - Abode")
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
      `)

      const mailtoLink = `mailto:leon@leonhayes.com.au?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form and show success
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      })
      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 bg-white shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light"
                placeholder="+61 123 456 789"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full h-12 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light px-3 bg-white"
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Product Demo">Product Demo</option>
              <option value="Pricing Information">Pricing Information</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Partnership Opportunity">Partnership Opportunity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 font-light px-3 py-3 resize-none"
              placeholder="Tell us about your property management needs..."
            />
          </div>

          {submitStatus === "success" && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-xl">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Email client opened! Your message is ready to send.</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Something went wrong. Please try again or email us directly.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white rounded-xl h-12 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              "Opening Email Client..."
            ) : (
              <>
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-sm text-gray-500 text-center font-light">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
