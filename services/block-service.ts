import "server-only"; // Ensures this logic never runs on the client
import { cache } from "react";
import { publicClient } from "@/config/viem";

export const getLatestBlocks = cache(async (count: number = 10) => {
  try {
    const latestBlockNumber = await publicClient.getBlockNumber();

    const blocks = await Promise.all(
      Array.from({ length: count }).map((_, i) =>
        publicClient.getBlock({
          blockNumber: latestBlockNumber - BigInt(i),
          includeTransactions: true,
        })
      )
    );

    return blocks;
  } catch (error) {
    console.error("Failed to fetch latest blocks:", error);
    return [];
  }
});
