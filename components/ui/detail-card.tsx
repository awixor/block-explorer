import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailCardProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function DetailCard({
  title,
  children,
  className,
  headerClassName,
  contentClassName,
}: DetailCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border overflow-hidden",
        className
      )}
    >
      <div className={cn("px-6 py-4 border-b bg-gray-50/50", headerClassName)}>
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <div className={cn("p-6 divide-y divide-gray-100", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
