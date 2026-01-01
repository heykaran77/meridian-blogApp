import { CommentSection } from "@/components/common/commentSection";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAuthQuery } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: Id<"posts"> }>;
}): Promise<Metadata> {
  const { blogId } = await params;
  const post = await fetchAuthQuery(api.posts.getPostById, { postId: blogId });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.content,
  };
}

export default async function ({
  params,
}: {
  params: Promise<{ blogId: Id<"posts"> }>;
}) {
  const { blogId } = await params;
  const [post, preloadedComments] = await Promise.all([
    await fetchAuthQuery(api.posts.getPostById, { postId: blogId }),
    await preloadQuery(api.comments.getCommentsByPost, {
      postId: blogId,
    }),
  ]);

  if (!post) {
    return <h1 className="text-6xl font-extrabold">No post found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href="/blog"
        className={buttonVariants({ variant: "outline", className: "mb-4" })}>
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm font-normal">Back to Blogs</span>
      </Link>

      <div className="relative w-full shadow-sm h-96 mb-8 rounded-xl overflow-hidden">
        <Image
          src={
            post.imageURL ??
            "https://4kwallpapers.com/images/walls/thumbs_3t/7730.jpg"
          }
          alt={post.title}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <span className="text-sm text-muted-foreground">
            Posted on: {new Date(post._creationTime).toLocaleDateString()}
          </span>
          <Separator className="my-4" />
        </div>
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.content}
        </p>

        <Separator className="my-8" />
        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </div>
  );
}
