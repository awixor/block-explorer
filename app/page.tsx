import { LatestBlocksTable } from "@/components/blocks/LatestBlocksTable";
import { LatestTransactionsTable } from "@/components/transactions/LatestTransactionsTable";
import { getLatestBlocks } from "@/services/block-service";
import { getLatestTransactions } from "@/services/tx-service";

export default async function Home() {
  const initialBlocks = await getLatestBlocks(10);
  const latestTransactions = await getLatestTransactions();

  return (
    <div className="flex flex-col items-center bg-background font-sans">
      <main className="flex w-full max-w-5xl flex-col items-center gap-6 py-12 px-8 sm:px-16 sm:items-start">
        <LatestBlocksTable blocks={initialBlocks} />
        <LatestTransactionsTable transactions={latestTransactions} />
      </main>
    </div>
  );
}
