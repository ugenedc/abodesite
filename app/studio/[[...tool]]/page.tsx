/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { isSanityConfigured } from '@/sanity/env'
import Link from 'next/link'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  // Only show Sanity Studio if properly configured
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-light text-white mb-6">
            Sanity Studio Not Configured
          </h1>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            To access the Sanity Studio, you need to configure your Sanity project credentials 
            in the environment variables.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-medium text-white mb-4">Required Environment Variables:</h3>
            <div className="space-y-2 font-mono text-sm text-white/90">
              <div>NEXT_PUBLIC_SANITY_PROJECT_ID</div>
              <div>NEXT_PUBLIC_SANITY_DATASET</div>
            </div>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
