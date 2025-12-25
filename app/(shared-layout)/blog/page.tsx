"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Blog() {
  // fetching data on client side: TODO -> Fetch on the Server side
  const data = useQuery(api.posts.getPosts);

  return <div>
    
  </div>;
}
