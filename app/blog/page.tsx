import { sanityClient } from '@/lib/sanity'
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
  const query = `*[_type == "post"] {
    title,
    overview,
    _id,
    "slug": slug.current
  }`
  const data = await sanityClient.fetch(query)
  return data
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
        {posts.map((post) => (
          <article key={post._id}>
            <Link href={`/blog/${post.slug}`}>
              <Card>
                <CardContent className="mt-6">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="line-clamp-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {post.overview}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 