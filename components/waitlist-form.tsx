"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist signup
    console.log("Waitlist signup:", email)
    setEmail("")
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
      />
      <Button type="submit" className={buttonClass}>
        Join Waitlist
      </Button>
    </form>
  )
} 