export const ROUTES = {
  HOME: "/",
  BLOCKS: "/blocks",
  // Dynamic routes
  BLOCK_DETAIL: (number: string | number) => `/blocks/${number}`,
  TRANSACTION_DETAIL: (hash: string) => `/transactions/${hash}`,
  ADDRESS_DETAIL: (address: string) => `/addresses/${address}`,
} as const;

export type AppRoute = typeof ROUTES;
