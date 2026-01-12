import Link from "next/link";
import { Boxes } from "lucide-react";
import { ROUTES } from "@/config/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-16 flex h-16 items-center">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 transition-opacity hover:opacity-80 no-underline"
        >
          <Boxes className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">
            Block Explorer
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link
            href={ROUTES.HOME}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
