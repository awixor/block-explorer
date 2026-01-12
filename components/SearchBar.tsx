"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { isAddress } from "viem";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setError(null);

    // Handle Address
    if (isAddress(trimmedQuery)) {
      router.push(ROUTES.ADDRESS_DETAIL(trimmedQuery));
      setQuery("");
      return;
    }

    // Handle Transaction Hash or Block Hash
    if (trimmedQuery.startsWith("0x") && trimmedQuery.length === 66) {
      router.push(ROUTES.TRANSACTION_DETAIL(trimmedQuery));
      setQuery("");
      return;
    }

    // Handle Block Number
    if (/^\d+$/.test(trimmedQuery)) {
      router.push(ROUTES.BLOCK_DETAIL(trimmedQuery));
      setQuery("");
      return;
    }

    setError(
      "Invalid search query. Please enter a valid Address, Txn Hash, or Block Number."
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute left-3 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Search by Address / Txn Hash / Block"
          className="w-full h-12 pl-10 pr-24 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
        />
        <div className="absolute right-1.5">
          <Button type="submit" size="sm" className="h-9 px-4">
            Search
          </Button>
        </div>
      </form>
      {error && (
        <p className="text-sm text-red-500 font-medium px-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
