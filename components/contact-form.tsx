"use client"

import React from "react"

export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/mwpboyrr"
      method="POST"
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-purple-400 to-orange-400 text-white font-medium shadow-lg hover:from-purple-500 hover:to-orange-500 transition-all duration-300"
      >
        Send Message
      </button>
    </form>
  )
}
