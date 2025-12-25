"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Controller, useForm } from "react-hook-form";

export default function Create() {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
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
          <form>
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
                      aria-invalid={fieldState.invalid}
                      {...field}
                      rows={20}
                      placeholder="your amazing blog content..."
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Button>Create Blog</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
