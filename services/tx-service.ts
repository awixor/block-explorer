import { getClient } from "@/config/viem";
import { cache } from "react";

export const getLatestTransactions = cache(async (chain?: string) => {
  try {
    const client = getClient(chain);
    const block = await client.getBlock({
      blockTag: "latest",
      includeTransactions: true,
    });

    return block.transactions.slice(0, 10);
  } catch (error) {
    console.error("Failed to fetch latest transactions:", error);
    return [];
  }
});

export const getTransaction = cache(async (hash: string, chain?: string) => {
  try {
    const client = getClient(chain);
    const transaction = await client.getTransaction({
      hash: hash as `0x${string}`,
    });
    return transaction;
  } catch (error) {
    console.error(`Failed to fetch transaction ${hash}:`, error);
    return null;
  }
});

export const getTransactionReceipt = cache(
  async (hash: string, chain?: string) => {
    try {
      const client = getClient(chain);
      const receipt = await client.getTransactionReceipt({
        hash: hash as `0x${string}`,
      });
      return receipt;
    } catch (error) {
      console.error(`Failed to fetch transaction receipt ${hash}:`, error);
      return null;
    }
  }
);
