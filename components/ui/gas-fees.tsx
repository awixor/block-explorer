import { formatUnits } from "viem";
import { cn } from "@/lib/utils";

interface GasFeesProps {
  baseFeePerGas?: bigint | null;
  maxFeePerGas?: bigint | null;
  maxPriorityFeePerGas?: bigint | null;
  className?: string;
}

export function GasFees({
  baseFeePerGas,
  maxFeePerGas,
  maxPriorityFeePerGas,
  className,
}: GasFeesProps) {
  if (!baseFeePerGas && !maxFeePerGas && !maxPriorityFeePerGas) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
        className
      )}
    >
      {baseFeePerGas && (
        <>
          <span className="text-gray-500">Base:</span>
          <span className="text-gray-900 font-medium">
            {formatUnits(baseFeePerGas, 9)} Gwei
          </span>
        </>
      )}
      {maxFeePerGas && (
        <>
          {baseFeePerGas && <span className="text-gray-300">|</span>}
          <span className="text-gray-500">Max:</span>
          <span className="text-gray-900 font-medium">
            {formatUnits(maxFeePerGas, 9)} Gwei
          </span>
        </>
      )}
      {maxPriorityFeePerGas && (
        <>
          {(baseFeePerGas || maxFeePerGas) && (
            <span className="text-gray-300">|</span>
          )}
          <span className="text-gray-500">Max Priority:</span>
          <span className="text-gray-900 font-medium">
            {formatUnits(maxPriorityFeePerGas, 9)} Gwei
          </span>
        </>
      )}
    </div>
  );
}
