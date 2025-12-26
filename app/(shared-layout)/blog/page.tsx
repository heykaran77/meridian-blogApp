"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  // fetching data on client side: TODO -> Fetch on the Server side
  const data = useQuery(api.posts.getPosts);

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

      <div className="grid lg:grid-cols-3 gap-6 md:grid-cols-2">
        {data?.map((post) => (
          <Link href={`/blog/${post._id}`} key={post._id}>
            <Card className="p-3 cursor-pointer">
              <div className="relative h-64 w-full overflow-hidden rounded-md outline-neutral-800 outline-1">
                <Image
                  src="https://4kwallpapers.com/images/walls/thumbs_3t/7730.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent>
                <h1 className="text-xl">{post.title}</h1>
                <p className="text-sm line-clamp-2">{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button className={cn("w-full", buttonVariants())}>
                  read more
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
