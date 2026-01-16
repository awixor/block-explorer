"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { isAddress } from "viem";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setError(null);

    const chainParam = chain || undefined;

    // Handle Address
    if (isAddress(trimmedQuery)) {
      router.push(ROUTES.ADDRESS_DETAIL(trimmedQuery, chainParam));
      setQuery("");
      return;
    }

    // Handle Transaction Hash or Block Hash
    if (trimmedQuery.startsWith("0x") && trimmedQuery.length === 66) {
      router.push(ROUTES.TRANSACTION_DETAIL(trimmedQuery, chainParam));
      setQuery("");
      return;
    }

    // Handle Block Number
    if (/^\d+$/.test(trimmedQuery)) {
      router.push(ROUTES.BLOCK_DETAIL(trimmedQuery, chainParam));
      setQuery("");
      return;
    }

    setError(
      "Invalid search query. Please enter a valid Address, Txn Hash, or Block Number."
    );
  };

  const currentChainLabel = chain === "sepolia" ? "Sepolia" : "Mainnet";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center gap-2"
      >
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError(null);
            }}
            placeholder={`Search by Address / Txn Hash / Block (${currentChainLabel})`}
            className="w-full h-12 pl-10 pr-24 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <Button type="submit" size="sm" className="h-9 px-4">
              Search
            </Button>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12 w-32 justify-between">
              {currentChainLabel}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setChain("")}>
              Mainnet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setChain("sepolia")}>
              Sepolia
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      {error && (
        <p className="text-sm text-red-500 font-medium px-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
