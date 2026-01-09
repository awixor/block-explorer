import { LatestBlocksTable } from "@/components/blocks/LatestBlocksTable";
import { publicClient } from "@/config/viem";

export default async function Home() {
  const blockNumber = await publicClient.getBlockNumber();

  const initialBlocks = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      publicClient.getBlock({
        blockNumber: blockNumber - BigInt(i),
        includeTransactions: true,
      })
    )
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center gap-6 py-16 px-8 sm:px-16 sm:items-start">
        <h1 className="text-4xl font-bold text-foreground">Latest Blocks</h1>
        <div className="w-full">
          <LatestBlocksTable blocks={initialBlocks} />
        </div>
      </main>
    </div>
  );
}
