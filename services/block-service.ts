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

export const getBlock = cache(async (id: string) => {
  try {
    const isHash = id.startsWith("0x");
    const block = await publicClient.getBlock({
      ...(isHash
        ? { blockHash: id as `0x${string}` }
        : { blockNumber: BigInt(id) }),
      includeTransactions: true,
    });
    return block;
  } catch (error) {
    console.error(`Failed to fetch block ${id}:`, error);
    return null;
  }
});

export const getLatestBlockNumber = cache(async () => {
  try {
    return await publicClient.getBlockNumber();
  } catch (error) {
    console.error("Failed to fetch latest block number:", error);
    return null;
  }
});
