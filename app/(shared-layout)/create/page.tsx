"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Create() {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const mutation = useMutation(api.posts.createPost);
  const onSubmit = (data: z.infer<typeof postSchema>) => {
    startTransition(() => {
      mutation({
        title: data.title,
        content: data.content,
      });

      toast.success("Blog created successfully");
    });
  };

  return (
    <div className="py-8">
      <div className=" text-center mb-4">
        <h1 className="text-4xl font-extrabold">Create Blog</h1>
        <p className="text-sm font-light text-muted-foreground">
          create your blog here
        </p>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool title..."
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      rows={8}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      placeholder="your amazing blog content..."
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Button disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Blog</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
