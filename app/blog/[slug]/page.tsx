import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { VT323 } from "next/font/google";
import Image from "next/image";
import { urlFor } from "@/lib/sanity-image";
import Link from "next/link";

export const revalidate = 30; // revalidate at most every 30 seconds

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Post {
  title: string;
  _id: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: any;
  mainImage: any;
}

async function getPost(slug: string) {
  if (!isSanityConfigured) {
    return null;
  }
  
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    _id,
    slug,
    publishedAt,
    body,
    mainImage
  }`;
  
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen">
        {/* Error Hero with Gradient */}
        <section className="relative pt-20 pb-32 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/90 via-purple-400/90 to-orange-300/90"></div>
          
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-4xl mx-auto pt-16">
              <div className="text-center pt-16">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h1 className="text-5xl md:text-6xl font-light text-white drop-shadow-lg mb-6">
                  Post Not Found
                </h1>
                <p className="text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto drop-shadow">
                  The blog post you're looking for doesn't exist or has been moved.
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <div className="my-12">
          <Image
            src={urlFor(value).url()}
            alt="post image"
            width={1200}
            height={600}
            className="rounded-2xl shadow-xl"
          />
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/90 via-purple-400/90 to-orange-300/90"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          {/* Back to blog link - top left corner */}
          <div className="absolute top-8 left-8 z-20">
            <Link 
              href="/blog"
              className="inline-flex items-center text-white hover:text-white/80 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>

          <div className="max-w-4xl mx-auto pt-24">
            {/* Content - centered */}
            <div className="text-center">
              {/* Date badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                <span className="text-sm text-white font-medium">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white drop-shadow-lg mb-8">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Main image if exists */}
            {post.mainImage && (
              <div className="mb-16 -mt-32 relative z-10">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            )}

            {/* Article content */}
            <article className="prose prose-xl max-w-none font-light prose-headings:font-light prose-p:font-light prose-li:font-light">
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full mb-12"></div>
              
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </article>

            {/* Bottom CTA */}
            <div className="mt-20 pt-16 border-t border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Ready to transform your property management?
                </h3>
                <p className="text-gray-500 font-light mb-8 max-w-2xl mx-auto">
                  Join the Abode waitlist and be the first to experience the future of property management.
                </p>
                <Link 
                  href="/#contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-400 to-orange-400 text-white rounded-full hover:from-purple-500 hover:to-orange-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Join Waitlist
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 