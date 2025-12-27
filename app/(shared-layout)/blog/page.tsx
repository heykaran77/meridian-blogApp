import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchAuthQuery } from "@/lib/auth-server";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 30;

export default async function Blog() {
  return (
    <div className="py-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4">
          Our Blogs
        </h1>
        <p className="text-center text-sm md:text-lg text-muted-foreground font-normal mb-12">
          Insights, tips & hacks about tech.
        </p>
      </div>
      <Suspense fallback={<BlogPostSkeleton />}>
        <LoadPost />
      </Suspense>
    </div>
  );
}

async function LoadPost() {
  // Fetching data on server side, but non-reactive
  const data = await fetchAuthQuery(api.posts.getPosts);

  return (
    <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2">
      {data?.map((post) => (
        <Link href={`/blog/${post._id}`} key={post._id} className="max-w-3xl">
          <Card className="p-3 cursor-pointer h-full flex flex-col">
            <div className="relative h-64 w-full overflow-hidden rounded-md shrink-0">
              <Image
                src={
                  post.imageUrl ??
                  "https://4kwallpapers.com/images/walls/thumbs_3t/7730.jpg"
                }
                alt={`${post.title}`}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 pt-4">
              <h1 className="text-xl font-bold line-clamp-2 mb-2">
                {post.title}
              </h1>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="w-full pt-0">
              <Button className={cn("w-full cursor-pointer", buttonVariants())}>
                read more
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-full space-y-3">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-6 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
