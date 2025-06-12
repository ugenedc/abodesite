import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any;
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, slug, publishedAt, body
    }`,
    { slug }
  );
  return post;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
        <article>
          <h1 className="text-5xl font-serif font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-gray-500 mb-8 text-sm">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose prose-lg prose-purple max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>
      </div>
    </div>
  );
} 