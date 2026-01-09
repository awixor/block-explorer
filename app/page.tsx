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

  console.log(initialBlocks[0]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-2 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold">Latest Blocks</h1>
        <LatestBlocksTable blocks={initialBlocks} />
      </main>
    </div>
  );
}
