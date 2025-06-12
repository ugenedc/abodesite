import { sanityClient } from '@/lib/sanity'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <div className="min-h-screen bg-gray-50/50 py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-light mb-20 text-center text-gray-900 leading-tight">
          From the <span className="text-orange-400">Blog</span>
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="block">
              <Card className="border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-light text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-500 text-base leading-relaxed font-light line-clamp-4">
                    {post.body && post.body[0]?.children[0]?.text}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 flex justify-between items-center">
                  <p className="text-gray-500 mb-0 text-sm font-light">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <span className="inline-block text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 