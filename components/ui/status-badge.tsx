import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, AlertCircle, Info } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-colors",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-700 border-green-100",
        error: "bg-red-50 text-red-700 border-red-100",
        pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
        info: "bg-blue-50 text-blue-700 border-blue-100",
        secondary: "bg-gray-50 text-gray-600 border-gray-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const variantIcons = {
  success: CheckCircle2,
  error: XCircle,
  pending: Clock,
  info: AlertCircle,
  secondary: Info,
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ElementType;
  showIcon?: boolean;
}

function StatusBadge({
  className,
  variant = "info",
  icon,
  showIcon = true,
  children,
  ...props
}: StatusBadgeProps) {
  const Icon = icon || (variant ? variantIcons[variant] : null);

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showIcon && Icon && (
        <Icon
          className={cn("w-4 h-4", variant === "pending" && "animate-pulse")}
        />
      )}
      {children}
    </div>
  );
}

export { StatusBadge, badgeVariants };
