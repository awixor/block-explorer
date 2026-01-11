export const ROUTES = {
  HOME: "/",
  BLOCKS: "/blocks",
  // Dynamic routes
  BLOCK_DETAIL: (number: string | number) => `/block/${number}`,
  TRANSACTION_DETAIL: (hash: string) => `/tx/${hash}`,
  ADDRESS_DETAIL: (address: string) => `/address/${address}`,
} as const;

export type AppRoute = typeof ROUTES;
