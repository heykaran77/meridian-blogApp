"use server";

import { postSchema } from "@/app/schemas/blog";
import z from "zod";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  // TODO:  Mutation!!!
}
