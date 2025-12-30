"use client";

import { commentSchema } from "@/app/schemas/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Loader2, MessageSquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function CommentSection() {
  const params = useParams<{ blogId: Id<"posts"> }>();
  const comments = useQuery(api.comments.getCommentsByPost, {
    postId: params.blogId,
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      blogId: params.blogId,
    },
  });
  const createComment = useMutation(api.comments.createComment);

  function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(data);
        toast.success("Comment Posted");
        form.reset();
      } catch (error) {
        toast.error("Failed to create post");
      }
    });
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 border-b">
        <MessageSquareIcon className="size-5" />
        <h2 className="text-xl font-bold">5 Comments</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="comment on this post"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]}></FieldError>
                )}
              </Field>
            )}
          />

          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Commenting
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>
        <section className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              // TODO Load & Show Comments.
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
