import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailRowProps {
  label: ReactNode;
  icon?: LucideIcon;
  children: ReactNode;
  itemsStart?: boolean;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function DetailRow({
  label,
  icon: Icon,
  children,
  itemsStart = false,
  className,
  labelClassName,
  valueClassName,
}: DetailRowProps) {
  return (
    <div
      className={cn(
        "py-4 flex flex-col sm:flex-row gap-2 first:pt-0 last:pb-0",
        itemsStart ? "sm:items-start" : "sm:items-center",
        className
      )}
    >
      <div
        className={cn(
          "sm:w-1/3 flex items-center gap-2 text-gray-500 font-medium",
          itemsStart && "sm:pt-1",
          labelClassName
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>
          {label}
          {typeof label === "string" && ":"}
        </span>
      </div>
      <div className={cn("sm:w-2/3", valueClassName)}>{children}</div>
    </div>
  );
}
