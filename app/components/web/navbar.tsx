import { ThemeToggle } from "@/app/components/web/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
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
        <Link href="/auth/signup" className={buttonVariants()}>
          Sign Up
        </Link>
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
