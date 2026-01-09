import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortDirection } from "@tanstack/react-table";

interface SortIconProps {
  sort: SortDirection | false;
  className?: string;
}

export function SortIcon({ sort, className = "ml-2 h-4 w-4" }: SortIconProps) {
  if (sort === "asc") return <ArrowUp className={className} />;
  if (sort === "desc") return <ArrowDown className={className} />;

  return <ArrowUpDown className={className} />;
}
