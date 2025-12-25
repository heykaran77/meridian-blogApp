"use server";

import { postSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import z from "zod";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  await fetchAuthMutation(api.posts.createPost, {
    title: parsed.data.title,
    content: parsed.data.content,
  });

  redirect("/");
}
