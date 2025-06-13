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
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row items-start gap-4 ${className}`}>
      <div className="flex-grow w-full">
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          className={`w-full rounded-xl border h-14 font-light px-4 ${inputClass}`}
          required
          disabled={loading}
        />
        {error && <div className="text-red-500 text-xs mt-2 text-left">{error}</div>}
      </div>
      <button
        type="submit"
        className={`w-full sm:w-auto rounded-xl h-14 px-6 font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 whitespace-nowrap ${buttonClass}`}
        disabled={loading}
      >
        {loading ? "..." : (
          <>
            <span>Join Waitlist</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
} 