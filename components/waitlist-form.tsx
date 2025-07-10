"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2 } from "lucide-react"

export default function WaitlistForm({
  className,
  inputClass,
  buttonClass,
  placeholder,
}: {
  className?: string
  inputClass?: string
  buttonClass?: string
  placeholder?: string
}) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    try {
      // Create mailto link with the email address
      const subject = encodeURIComponent("New Waitlist Signup - Abode")
      const body = encodeURIComponent(`New waitlist signup for Abode:

Email: ${email}
Timestamp: ${new Date().toISOString()}

Please add this email to the Abode waitlist.`)
      
      const mailtoLink = `mailto:ugenedc@gmail.com?subject=${subject}&body=${body}`
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Open email client
      window.location.href = mailtoLink
      
      // Show success message
      setIsSubmitted(true)
      setEmail("")
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">Thanks for joining our waitlist!</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        type="email"
        placeholder={placeholder || "Enter your email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        required
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        className={buttonClass}
        disabled={isSubmitting || !email}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </form>
  )
} 