import "server-only"; // Ensures this logic never runs on the client
import { cache } from "react";
import { getClient } from "@/config/viem";

export const getLatestBlocks = cache(
  async (count: number = 10, chain?: string) => {
    try {
      const client = getClient(chain);
      const latestBlockNumber = await client.getBlockNumber();

      const blocks = await Promise.all(
        Array.from({ length: count }).map((_, i) =>
          client.getBlock({
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
  }
);

export const getBlock = cache(async (id: string, chain?: string) => {
  try {
    const client = getClient(chain);
    const isHash = id.startsWith("0x");
    const block = await client.getBlock({
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

export const getLatestBlockNumber = cache(async (chain?: string) => {
  try {
    const client = getClient(chain);
    return await client.getBlockNumber();
  } catch (error) {
    console.error("Failed to fetch latest block number:", error);
    return null;
  }
});
