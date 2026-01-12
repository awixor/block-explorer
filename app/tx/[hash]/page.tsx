import { getTransaction, getTransactionReceipt } from "@/services/tx-service";
import { getBlock, getLatestBlockNumber } from "@/services/block-service";
import {
  formatTimestamp,
  formatGasUsed,
  formatGasPercentage,
  formatTimeAgo,
} from "@/lib/formatters";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Hash,
  User,
  Zap,
  Info,
  Box,
  HelpCircle,
  Cpu,
} from "lucide-react";
import { formatEther, formatUnits } from "viem";
import { DetailCard } from "@/components/ui/detail-card";
import { DetailRow } from "@/components/ui/detail-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { GasFees } from "@/components/ui/gas-fees";
import { AddressLink } from "@/components/ui/address-link";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  const [tx, receipt, latestBlockNumber] = await Promise.all([
    getTransaction(hash),
    getTransactionReceipt(hash),
    getLatestBlockNumber(),
  ]);

  if (!tx) {
    return notFound();
  }

  // Fetch block to get timestamp
  const block = tx.blockNumber
    ? await getBlock(tx.blockNumber.toString())
    : null;

  const status = receipt?.status === "success";
  const confirmations =
    latestBlockNumber && tx.blockNumber
      ? latestBlockNumber - tx.blockNumber + BigInt(1)
      : BigInt(0);

  const gasUsed = receipt?.gasUsed ?? BigInt(0);
  const gasPrice = receipt?.effectiveGasPrice ?? tx.gasPrice ?? BigInt(0);
  const txFee = gasUsed * gasPrice;

  const burntFees =
    block?.baseFeePerGas && receipt?.gasUsed
      ? block.baseFeePerGas * receipt.gasUsed
      : BigInt(0);

  const savingsFees =
    tx.maxFeePerGas && receipt?.effectiveGasPrice && receipt?.gasUsed
      ? (tx.maxFeePerGas - receipt.effectiveGasPrice) * receipt.gasUsed
      : BigInt(0);

  const renderTo = () => {
    const address = tx.to || receipt?.contractAddress || null;
    const isContract = !tx.to && !!receipt?.contractAddress;

    return (
      <AddressLink
        address={address}
        isContract={isContract}
        truncate={!receipt}
      />
    );
  };

  const renderFrom = () => {
    return <AddressLink address={tx.from} truncate={false} />;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Transaction Details</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <DetailCard title="Overview">
          <DetailRow label="Transaction Hash" icon={Hash}>
            <span className="font-mono text-sm break-all text-gray-900">
              {tx.hash}
            </span>
          </DetailRow>

          <DetailRow label="Status" icon={Info}>
            {receipt ? (
              <StatusBadge variant={status ? "success" : "error"}>
                {status ? "Success" : "Failed"}
              </StatusBadge>
            ) : (
              <StatusBadge variant="pending">Pending</StatusBadge>
            )}
          </DetailRow>

          <DetailRow label="Block" icon={Box}>
            <div className="flex items-center gap-2">
              {tx.blockNumber ? (
                <>
                  <Link
                    href={ROUTES.BLOCK_DETAIL(tx.blockNumber.toString())}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {tx.blockNumber.toString()}
                  </Link>
                  <StatusBadge
                    variant="secondary"
                    showIcon={false}
                    className="text-xs py-0.5 px-2"
                  >
                    {confirmations.toString()} Block Confirmations
                  </StatusBadge>
                </>
              ) : (
                <span className="text-gray-400 italic">Pending</span>
              )}
            </div>
          </DetailRow>

          <DetailRow label="Timestamp" icon={Clock}>
            {block ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-900">
                  {formatTimestamp(block.timestamp)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({formatTimeAgo(block.timestamp)})
                </span>
              </div>
            ) : (
              <span className="text-gray-400 italic">Awaiting inclusion</span>
            )}
          </DetailRow>

          <div className="border-t my-2" />

          <DetailRow label="From" icon={User}>
            {renderFrom()}
          </DetailRow>

          <DetailRow label="To" icon={User}>
            {renderTo()}
          </DetailRow>

          <DetailRow label="Value" icon={HelpCircle}>
            <span className="font-bold text-gray-900">
              {formatEther(tx.value)} ETH
            </span>
          </DetailRow>

          <DetailRow label="Transaction Fee" icon={Zap}>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-gray-900">
                {formatEther(txFee)} ETH
              </span>
              {receipt && (
                <span className="text-xs text-gray-500">
                  {formatGasUsed(receipt.gasUsed)} gas used @{" "}
                  {formatUnits(gasPrice, 9)} Gwei
                </span>
              )}
            </div>
          </DetailRow>

          <DetailRow label="Gas Price" icon={Cpu}>
            <span className="text-gray-900">
              {formatUnits(gasPrice, 9)} Gwei
              <span className="text-gray-400 text-xs ml-1">
                ({formatEther(gasPrice)} ETH)
              </span>
            </span>
          </DetailRow>

          {(tx.maxFeePerGas ||
            tx.maxPriorityFeePerGas ||
            block?.baseFeePerGas) && (
            <DetailRow label="Gas Fees" icon={Info}>
              <GasFees
                baseFeePerGas={block?.baseFeePerGas}
                maxFeePerGas={tx.maxFeePerGas}
                maxPriorityFeePerGas={tx.maxPriorityFeePerGas}
              />
            </DetailRow>
          )}
        </DetailCard>

        <DetailCard title="More Details">
          <DetailRow label="Gas Limit">
            <span className="text-gray-700">{formatGasUsed(tx.gas)}</span>
          </DetailRow>

          {receipt && (
            <DetailRow label="Gas Usage by Transaction">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">
                  {formatGasUsed(receipt.gasUsed)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({formatGasPercentage(receipt.gasUsed, tx.gas)})
                </span>
              </div>
            </DetailRow>
          )}

          <DetailRow label="Nonce">
            <span className="text-gray-700">{tx.nonce}</span>
          </DetailRow>

          {burntFees > BigInt(0) && (
            <DetailRow label="Burnt Fees">
              <span className="text-orange-600 font-bold">
                🔥 {formatEther(burntFees)} ETH
              </span>
            </DetailRow>
          )}

          {savingsFees > BigInt(0) && (
            <DetailRow label="Txn Savings Fees">
              <span className="text-green-600 font-bold">
                💰 {formatEther(savingsFees)} ETH
              </span>
            </DetailRow>
          )}

          <DetailRow label="Input Data" itemsStart>
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs break-all border text-gray-600 max-h-48 overflow-y-auto">
                {tx.input}
              </div>
              {tx.input !== "0x" && (
                <div className="text-xs text-gray-400 italic">Raw Hex Data</div>
              )}
            </div>
          </DetailRow>
        </DetailCard>
      </div>
    </div>
  );
}
