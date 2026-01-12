import "server-only";
import { cache } from "react";
import { publicClient } from "@/config/viem";
import { isAddress } from "viem";

export const getAddressInfo = cache(async (address: string) => {
  try {
    if (!isAddress(address)) {
      return null;
    }

    const [balance, code, transactionCount] = await Promise.all([
      publicClient.getBalance({ address }),
      publicClient.getCode({ address }),
      publicClient.getTransactionCount({ address }),
    ]);

    const isContract = code && code !== "0x";

    return {
      address,
      balance,
      code,
      isContract,
      transactionCount,
    };
  } catch (error) {
    console.error(`Failed to fetch address info for ${address}:`, error);
    return null;
  }
});

export const getAddressBalance = cache(async (address: string) => {
  try {
    if (!isAddress(address)) {
      return null;
    }

    return await publicClient.getBalance({ address });
  } catch (error) {
    console.error(`Failed to fetch balance for ${address}:`, error);
    return null;
  }
});
