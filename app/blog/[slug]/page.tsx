import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { VT323 } from "next/font/google";
import Image from "next/image";
import { urlFor } from "@/lib/sanity-image";

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
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    _id,
    slug,
    publishedAt,
    body,
    mainImage
  }`;
  const data = await sanityClient.fetch(query);
  return data;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: Post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="post image"
          width={800}
          height={400}
          className="rounded-lg my-8"
        />
      ),
    },
  };

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(post.publishedAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.title}
            </h1>
          </div>
        </div>
      </header>
      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pt-10 pb-8 dark:prose-invert prose-lg">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 