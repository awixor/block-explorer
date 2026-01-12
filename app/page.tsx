import { LatestBlocksTable } from "@/components/blocks/LatestBlocksTable";
import { LatestTransactionsTable } from "@/components/transactions/LatestTransactionsTable";
import { getLatestBlocks } from "@/services/block-service";
import { getLatestTransactions } from "@/services/tx-service";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";

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
      <main className="flex w-full max-w-5xl flex-col items-center gap-6 py-12 px-8 sm:px-16 sm:items-start">
        <Suspense fallback={<TableSkeleton rows={10} columns={4} />}>
          <BlocksSection />
        </Suspense>
        <Suspense fallback={<TableSkeleton rows={10} columns={4} />}>
          <TransactionsSection />
        </Suspense>
      </main>
    </div>
  );
}
