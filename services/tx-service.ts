import { publicClient } from "@/config/viem";
import { cache } from "react";

export const getLatestTransactions = cache(async () => {
  try {
    const block = await publicClient.getBlock({
      blockTag: "latest",
      includeTransactions: true,
    });

    return block.transactions.slice(0, 10);
  } catch (error) {
    console.error("Failed to fetch latest transactions:", error);
    return [];
  }
});
