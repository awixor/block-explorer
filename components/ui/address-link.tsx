"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { formatHash } from "@/lib/formatters";
import { FileCode } from "lucide-react";
import { usePathname } from "next/navigation";

interface AddressLinkProps {
  address: string | null;
  isContract?: boolean;
  className?: string;
  truncate?: boolean;
  chain?: string;
}

export function AddressLink({
  address,
  isContract = false,
  className,
  truncate = true,
  chain: manualChain,
}: AddressLinkProps) {
  const pathname = usePathname();
  const chainFromPath = pathname?.startsWith("/sepolia")
    ? "sepolia"
    : undefined;
  const chain = manualChain || chainFromPath;

  if (!address) {
    return (
      <div className="flex items-center gap-1.5 text-gray-400 italic">
        <FileCode className="w-3.5 h-3.5" />
        <span>Contract Creation</span>
      </div>
    );
  }

  const displayAddress = truncate ? formatHash(address) : address;

  return (
    <Link
      href={ROUTES.ADDRESS_DETAIL(address, chain)}
      className={cn(
        "text-blue-600 hover:text-blue-800 font-mono transition-colors",
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        {isContract && <FileCode className="w-3.5 h-3.5 text-gray-500" />}
        <span className={cn(!truncate && "break-all")}>{displayAddress}</span>
      </div>
    </Link>
  );
}
