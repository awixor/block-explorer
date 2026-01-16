export const ROUTES = {
  HOME: "/",
  BLOCKS: "/blocks",
  // Dynamic routes
  BLOCK_DETAIL: (number: string | number, chain?: string) =>
    chain === "sepolia" ? `/sepolia/block/${number}` : `/block/${number}`,
  TRANSACTION_DETAIL: (hash: string, chain?: string) =>
    chain === "sepolia" ? `/sepolia/tx/${hash}` : `/tx/${hash}`,
  ADDRESS_DETAIL: (address: string, chain?: string) =>
    chain === "sepolia" ? `/sepolia/address/${address}` : `/address/${address}`,
} as const;

export type AppRoute = typeof ROUTES;
