"use client"

import React, { useState } from "react"

export default function ContactForm() {
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
      const res = await fetch("https://formspree.io/f/mwpboyrr", {
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
      <div className="rounded-xl bg-white/20 border border-white/30 p-6 text-center text-gray-900 shadow-lg">
        <div className="text-2xl mb-2">🎉 Thanks for reaching out!</div>
        <div className="text-gray-800">We'll get back to you as soon as possible.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-purple-400 to-orange-400 text-white font-medium shadow-lg hover:from-purple-500 hover:to-orange-500 transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  )
}
