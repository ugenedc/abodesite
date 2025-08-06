import { sanityClient, isSanityConfigured } from '@/lib/sanity'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export const revalidate = 30; // revalidate at most every 30 seconds

interface Post {
  title: string
  overview: string
  _id: string
  slug: { current: string }
}

async function getPosts() {
  if (!isSanityConfigured) {
    return [];
  }
  
  const query = `*[_type == "post"] {
    title,
    overview,
    _id,
    "slug": slug.current
  }`
  
  try {
    const data = await sanityClient.fetch(query)
    return data
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 overflow-hidden">
        {/* Gradient Overlay for seamless effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/90 via-purple-400/90 to-orange-300/90"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center pt-16 pb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
              <span className="text-sm text-white font-medium">Insights & Updates</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight text-white drop-shadow-lg mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
              Stories, insights, and updates from the future of property management
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-8">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {posts.map((post, index) => (
                <article key={post._id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-100/50 h-full group-hover:scale-[1.02] transform">
                      <CardContent className="p-10">
                        {/* Gradient accent */}
                        <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mb-8 group-hover:w-16 transition-all duration-500"></div>
                        
                        <h2 className="text-2xl font-light text-gray-900 mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-orange-500 transition-all duration-500">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 leading-relaxed font-light text-lg line-clamp-4">
                          {post.overview}
                        </p>
                        
                        {/* Read more indicator */}
                        <div className="mt-8 flex items-center text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
                          <span className="text-sm font-medium">Read more</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">No posts yet</h3>
              <p className="text-gray-500 font-light">Check back soon for insights and updates from the Abode team.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 