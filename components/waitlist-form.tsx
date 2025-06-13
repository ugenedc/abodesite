"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function WaitlistForm({ className = "", inputClass = "", buttonClass = "", placeholder = "Enter your email to join waitlist" }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch("https://formspree.io/f/xblyowzq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Something went wrong. Please try again later.")
      }
    } catch {
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`rounded-xl bg-white/20 border border-white/30 p-6 text-center shadow-lg ${className}`}>
        <div className="text-2xl mb-2 text-white">🎉 You're on the list!</div>
        <div className="text-white/90">We'll notify you as soon as Abode launches.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${className}`}> 
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className={`rounded-xl border h-14 font-light pl-6 ${inputClass}`}
        required
        disabled={loading}
      />
      <button
        type="submit"
        className={`bg-white text-gray-900 hover:bg-gray-100 rounded-full h-14 px-8 font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${buttonClass}`}
        disabled={loading}
      >
        {loading ? "Joining..." : "Join Waitlist"}
        <ArrowRight className="ml-2 h-4 w-4 inline" />
      </button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  )
} 