"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2, Send, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setIsSubmitting(true)
    setError("")
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: name,
          email: email,
          message: message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setName("")
        setEmail("")
        setMessage("")
        
        // Reset success message after 8 seconds
        setTimeout(() => setIsSubmitted(false), 8000)
      } else {
        setError(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent!</h3>
            <p className="text-green-700">
              Thank you for reaching out. We'll get back to you soon!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <Input 
              id="name"
              placeholder="Your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input 
              id="email"
              placeholder="your@email.com" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea 
              id="message"
              placeholder="Tell us about your property management needs..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
              disabled={isSubmitting}
              required
            />
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-purple-400 to-orange-400 hover:from-purple-500 hover:to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isSubmitting || !name || !email || !message}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 