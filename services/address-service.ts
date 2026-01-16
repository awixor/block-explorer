import "server-only";
import { cache } from "react";
import { getClient } from "@/config/viem";
import { isAddress } from "viem";

export const getAddressInfo = cache(async (address: string, chain?: string) => {
  try {
    if (!isAddress(address)) {
      return null;
    }

    const client = getClient(chain);
    const [balance, code, transactionCount] = await Promise.all([
      client.getBalance({ address }),
      client.getCode({ address }),
      client.getTransactionCount({ address }),
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

export const getAddressBalance = cache(
  async (address: string, chain?: string) => {
    try {
      if (!isAddress(address)) {
        return null;
      }

      const client = getClient(chain);
      return await client.getBalance({ address });
    } catch (error) {
      console.error(`Failed to fetch balance for ${address}:`, error);
      return null;
    }
  }
);
