import Link from "next/link";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

interface NotFoundDisplayProps {
  title: string;
  description: string;
  type: "Transaction" | "Block" | "Address";
  identifier?: string;
}

export function NotFoundDisplay({
  title,
  description,
  type,
  identifier,
}: NotFoundDisplayProps) {
  return (
    <div className="container mx-auto py-20 px-4 max-w-2xl text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-6 rounded-full">
          <Search className="w-12 h-12 text-slate-400" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-slate-500 text-lg mb-8">{description}</p>

      {identifier && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 font-mono text-sm break-all">
          <span className="text-slate-400 mr-2">{type}:</span>
          <span className="text-slate-700">{identifier}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Try another search
          </Link>
        </Button>
      </div>
    </div>
  );
}
