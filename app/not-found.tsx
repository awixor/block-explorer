import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export default function GlobalNotFound() {
  return (
    <div className="container mx-auto py-32 px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
