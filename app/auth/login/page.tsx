"use client";

import { loginInSchema } from "@/app/schemas/auth";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof loginInSchema>) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login Successfull");
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="*****"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Button disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin size-4" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
