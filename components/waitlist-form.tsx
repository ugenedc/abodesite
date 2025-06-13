"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function WaitlistForm({
  className = "",
  inputClass = "",
  buttonClass = "",
  placeholder = "Enter your email to join waitlist",
  successClassName = "",
}) {
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
      <div className={`rounded-xl p-6 text-center shadow-lg ${successClassName}`}>
        <div className="text-2xl mb-2 text-white">🎉 You're on the list!</div>
        <div className="text-white/90">We'll notify you as soon as Abode launches.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className={`rounded-xl border h-12 font-light px-4 flex-grow ${inputClass}`}
        required
        disabled={loading}
      />
      <button
        type="submit"
        className={`rounded-xl h-12 px-6 font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 ${buttonClass}`}
        disabled={loading}
      >
        {loading ? "..." : <ArrowRight className="h-5 w-5" />}
      </button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  )
} 