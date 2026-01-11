import { getBlock } from "@/services/block-service";
import {
  formatTimestamp,
  formatGasUsed,
  formatGasPercentage,
} from "@/lib/formatters";
import { decodeHexToString } from "@/lib/utils";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  FileText,
  Hash,
  Layers,
  User,
  Zap,
  Info,
} from "lucide-react";
import { formatUnits } from "viem";
import { DetailCard } from "@/components/ui/detail-card";
import { DetailRow } from "@/components/ui/detail-row";

export default async function BlockDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const block = await getBlock(id);

  if (!block) {
    return notFound();
  }

  const burntFees = block.baseFeePerGas
    ? block.gasUsed * block.baseFeePerGas
    : BigInt(0);

  const txCount = block.transactions.length;
  const decodedExtraData = decodeHexToString(block.extraData);
  const blockNumber = block.number ? Number(block.number) : 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Block Details</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <DetailCard title="Overview">
          <DetailRow label="Block Height" icon={Info}>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold">
                {block.number?.toString()}
              </span>
              <div className="flex gap-1">
                <Link
                  href={ROUTES.BLOCK_DETAIL(blockNumber - 1)}
                  className="p-1.5 hover:bg-gray-100 rounded-md border transition-colors text-gray-600"
                  title="Previous Block"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link
                  href={ROUTES.BLOCK_DETAIL(blockNumber + 1)}
                  className="p-1.5 hover:bg-gray-100 rounded-md border transition-colors text-gray-600"
                  title="Next Block"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </DetailRow>

          <DetailRow label="Timestamp" icon={Clock}>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">
                {formatTimestamp(block.timestamp)}
              </span>
              <span className="text-gray-400 text-sm">
                ({Math.floor(Date.now() / 1000 - Number(block.timestamp))}{" "}
                seconds ago)
              </span>
            </div>
          </DetailRow>

          <DetailRow label="Transactions" icon={FileText}>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                {txCount} transactions
              </div>
              {block.withdrawals && block.withdrawals.length > 0 && (
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                  {block.withdrawals.length} withdrawals
                </div>
              )}
              <span className="text-gray-500">in this block</span>
            </div>
          </DetailRow>

          <DetailRow label="Fee Recipient" icon={User}>
            <Link
              href={ROUTES.ADDRESS_DETAIL(block.miner)}
              className="text-blue-600 hover:text-blue-800 font-mono break-all flex items-center gap-1"
            >
              {block.miner}
            </Link>
          </DetailRow>

          <DetailRow label="Gas Used" icon={Zap}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-medium">
                {formatGasUsed(block.gasUsed)}
              </span>
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: formatGasPercentage(block.gasUsed, block.gasLimit),
                  }}
                />
              </div>
              <span className="text-sm text-gray-500">
                {formatGasPercentage(block.gasUsed, block.gasLimit)}
              </span>
            </div>
          </DetailRow>

          <DetailRow label="Gas Limit" icon={Database}>
            <span className="font-mono text-gray-700">
              {formatGasUsed(block.gasLimit)}
            </span>
          </DetailRow>

          {block.baseFeePerGas && (
            <DetailRow label="Base Fee Per Gas" icon={Info}>
              <span className="font-medium">
                {formatUnits(block.baseFeePerGas, 9)} Gwei
              </span>
              <span className="text-gray-400 text-sm ml-2 font-mono">
                ({formatUnits(block.baseFeePerGas, 18)} ETH)
              </span>
            </DetailRow>
          )}

          {burntFees > BigInt(0) && (
            <DetailRow label="Burnt Fees" icon={Zap}>
              <span className="text-orange-600 font-bold">
                🔥 {formatUnits(burntFees, 18)} ETH
              </span>
            </DetailRow>
          )}

          <DetailRow label="Extra Data" icon={Hash} itemsStart>
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs break-all border text-gray-600">
                {block.extraData}
              </div>
              {decodedExtraData && (
                <div className="text-sm text-gray-500 italic px-1">
                  Decoded: &quot;{decodedExtraData}&quot;
                </div>
              )}
            </div>
          </DetailRow>
        </DetailCard>

        <DetailCard title="More Details">
          <DetailRow label="Hash">
            <span className="font-mono text-sm break-all text-gray-700">
              {block.hash}
            </span>
          </DetailRow>

          <DetailRow label="Parent Hash">
            <Link
              href={ROUTES.BLOCK_DETAIL(block.parentHash)}
              className="text-blue-600 hover:text-blue-800 font-mono text-sm break-all flex items-center gap-1"
            >
              {block.parentHash}
            </Link>
          </DetailRow>

          <DetailRow label="StateRoot">
            <span className="font-mono text-sm break-all text-gray-700">
              {block.stateRoot}
            </span>
          </DetailRow>

          {block.nonce && (
            <DetailRow label="Nonce">
              <span className="font-mono text-sm text-gray-700">
                {block.nonce}
              </span>
            </DetailRow>
          )}

          {block.difficulty > BigInt(0) && (
            <DetailRow label="Difficulty">
              <span className="text-sm text-gray-700">
                {block.difficulty.toString()}
              </span>
            </DetailRow>
          )}

          {block.totalDifficulty && block.totalDifficulty > BigInt(0) && (
            <DetailRow label="Total Difficulty">
              <span className="text-sm text-gray-700">
                {block.totalDifficulty.toString()}
              </span>
            </DetailRow>
          )}
        </DetailCard>
      </div>
    </div>
  );
}
