import { getAddressInfo } from "@/services/address-service";
import { formatEther } from "viem";
import { notFound } from "next/navigation";
import { Wallet, FileCode, Hash, Database, Info, Coins } from "lucide-react";
import { DetailCard } from "@/components/ui/detail-card";
import { DetailRow } from "@/components/ui/detail-row";
import { StatusBadge } from "@/components/ui/status-badge";
import { getEthPrice } from "@/services/price-service";

export default async function AddressDetailPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  const addressInfo = await getAddressInfo(address);

  if (!addressInfo) {
    return notFound();
  }

  const ethPrice = await getEthPrice();
  const balanceInETH = Number(formatEther(addressInfo.balance));
  const balanceInUSD = (balanceInETH * ethPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Address Details</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <DetailCard title="Overview">
          <DetailRow label="Address" icon={Hash}>
            <span className="font-mono text-sm break-all text-gray-900">
              {addressInfo.address}
            </span>
          </DetailRow>

          <DetailRow label="Type" icon={Info}>
            <StatusBadge
              variant={addressInfo.isContract ? "info" : "secondary"}
              showIcon={false}
            >
              {addressInfo.isContract ? (
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Contract</span>
                </div>
              ) : (
                "EOA (Externally Owned Account)"
              )}
            </StatusBadge>
          </DetailRow>

          <DetailRow label="Balance" icon={Coins}>
            <span className="font-bold text-gray-900">
              {balanceInETH} ETH ({balanceInUSD} USD)
            </span>
          </DetailRow>

          <DetailRow label="Transaction Count" icon={Database}>
            <span className="text-gray-900">
              {addressInfo.transactionCount}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              (
              {addressInfo.transactionCount === 1
                ? "transaction"
                : "transactions"}
              )
            </span>
          </DetailRow>
        </DetailCard>

        <DetailCard title="More Details">
          <DetailRow label="Address (Checksummed)">
            <span className="font-mono text-sm break-all text-gray-700">
              {addressInfo.address}
            </span>
          </DetailRow>

          <DetailRow label="Address (Lowercase)">
            <span className="font-mono text-sm break-all text-gray-700">
              {addressInfo.address.toLowerCase()}
            </span>
          </DetailRow>

          {addressInfo.isContract && (
            <DetailRow label="Contract Bytecode" itemsStart>
              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs break-all border text-gray-600 max-h-48 overflow-y-auto">
                  {addressInfo.code === "0x" ? "No bytecode" : addressInfo.code}
                </div>
                {addressInfo.code && addressInfo.code !== "0x" && (
                  <div className="text-xs text-gray-400 italic">
                    {addressInfo.code.length - 2} bytes
                  </div>
                )}
              </div>
            </DetailRow>
          )}
        </DetailCard>
      </div>
    </div>
  );
}
