"use client";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function Navbar() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logout successful");
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
    <nav className="flex items-center justify-between w-full py-6">
      <div className="flex items-center gap-8">
        <Link href="/">Meridian</Link>

        <div className="flex items-center gap-4">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? null : isAuthenticated ? (
          <Button onClick={handleLogout} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="animate-spin size-4" />
                <span>Logout</span>
              </>
            ) : (
              <span>Logout</span>
            )}
          </Button>
        ) : (
          <>
            <Link href="/auth/signup" className={buttonVariants()}>
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "outline" })}>
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
