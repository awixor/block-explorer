import { LatestBlocksTable } from "@/components/blocks/LatestBlocksTable";
import { LatestTransactionsTable } from "@/components/transactions/LatestTransactionsTable";
import { getLatestBlocks } from "@/services/block-service";
import { getLatestTransactions } from "@/services/tx-service";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { SearchBar } from "@/components/SearchBar";

async function BlocksSection() {
  const initialBlocks = await getLatestBlocks(10);
  return <LatestBlocksTable blocks={initialBlocks} />;
}

async function TransactionsSection() {
  const latestTransactions = await getLatestTransactions();
  return <LatestTransactionsTable transactions={latestTransactions} />;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background font-sans">
      <div className="w-full bg-slate-900 py-16 px-4 mb-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              The Ethereum Blockchain Explorer
            </h1>
            <p className="text-slate-400 text-lg max-w-[700px]">
              Search for transactions, blocks, and addresses on the Ethereum
              network.
            </p>
          </div>
          <SearchBar />
        </div>
      </div>
      <main className="flex w-full max-w-5xl flex-col items-center gap-6 pb-12 px-8 sm:px-16 sm:items-start">
        <div className="grid grid-cols-1 gap-8 w-full">
          <Suspense fallback={<TableSkeleton rows={10} columns={4} />}>
            <BlocksSection />
          </Suspense>
          <Suspense fallback={<TableSkeleton rows={10} columns={4} />}>
            <TransactionsSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
