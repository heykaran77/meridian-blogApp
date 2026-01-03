import { CommentSection } from "@/components/common/commentSection";
import { PostPresence } from "@/components/common/PostPresence";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: Id<"posts"> }>;
}): Promise<Metadata> {
  try {
    const { blogId } = await params;

    // Guard against invalid/placeholder IDs in dev mode
    if (!blogId || (typeof blogId === "string" && blogId.startsWith("["))) {
      return {
        title: "Blog | Meridian",
      };
    }

    const post = await fetchQuery(api.posts.getPostById, { postId: blogId });

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.title,
      description: post.content,
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Blog | Meridian",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: Id<"posts"> }>;
}) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href="/blog"
        className={buttonVariants({ variant: "outline", className: "mb-4" })}>
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm font-normal">Back to Blogs</span>
      </Link>

      <Suspense fallback={<LoadingSkeleton />}>
        <LoadPost params={params} />
      </Suspense>
    </div>
  );
}

async function LoadPost({
  params,
}: {
  params: Promise<{ blogId: Id<"posts"> }>;
}) {
  const { blogId } = await params;

  // Guard against invalid/placeholder IDs in dev mode
  if (!blogId || (typeof blogId === "string" && blogId.startsWith("["))) {
    return <LoadingSkeleton />;
  }

  const token = await getToken();
  const [post, preloadedComments, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId: blogId }),
    preloadQuery(api.comments.getCommentsByPost, {
      postId: blogId,
    }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!userId) {
    return redirect("/auth/login");
  }

  if (!post) {
    return <h1 className="text-6xl font-extrabold">No post found</h1>;
  }
  return (
    <>
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
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Posted on: {new Date(post._creationTime).toLocaleDateString()}
            </span>
            {userId && <PostPresence roomId={post._id} userId={userId} />}
          </div>

          <Separator className="my-4" />
        </div>
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.content}
        </p>

        <Separator className="my-8" />
        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Skeleton className="w-full h-[400px] mb-8 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  );
}
