import { sanityClient } from '@/lib/sanity'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  body: any
}

async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id, title, slug, publishedAt, body
    }`
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center text-gray-900">Blog</h1>
        <div className="space-y-12">
          {posts.map(post => (
            <div key={post._id} className="p-8 rounded-2xl shadow-md bg-white hover:bg-gray-50 transition">
              <Link href={`/blog/${post.slug.current}`} className="block">
                <h2 className="text-3xl font-serif font-semibold text-purple-700 mb-2">{post.title}</h2>
                <p className="text-gray-500 mb-4 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
                <p className="text-gray-700 line-clamp-3">
                  {/* Show a short excerpt from the first block of the body */}
                  {post.body && post.body[0]?.children[0]?.text?.slice(0, 160)}
                  {post.body && post.body[0]?.children[0]?.text?.length > 160 ? '...' : ''}
                </p>
                <span className="inline-block mt-4 text-orange-500 font-medium">Read more →</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 