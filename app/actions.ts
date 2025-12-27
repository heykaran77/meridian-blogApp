"use server";

import { postSchema } from "@/app/schemas/blog";
import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Something went wrong");
    }

    const imageURL = await fetchAuthMutation(
      api.posts.generateImageUploadURL,
      {}
    );

    const uploadResult = await fetch(imageURL, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult) {
      return {
        error: "Failed to uplaod image",
      };
    }
    const { storageId } = await uploadResult.json();

    await fetchAuthMutation(api.posts.createPost, {
      title: parsed.data.title,
      content: parsed.data.content,
      imageStorageId: storageId,
    });
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  revalidatePath("/blog");
  return redirect("/blog");
}
