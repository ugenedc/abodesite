"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"

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
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")
    
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
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setError(result.error || 'Failed to send email')
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
      
      {error && (
        <div className="flex items-center space-x-2 p-3 mt-2 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-red-800 text-sm">{error}</span>
        </div>
      )}
    </form>
  )
} 