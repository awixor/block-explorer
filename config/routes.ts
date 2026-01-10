export const ROUTES = {
  HOME: "/",
  BLOCKS: "/blocks",
  // Dynamic routes
  BLOCK_DETAIL: (number: string | number) => `/blocks/${number}`,
  TRANSACTION_DETAIL: (address: string) => `/tx/${address}`,
  ADDRESS_DETAIL: (address: string) => `/address/${address}`,
} as const;

export type AppRoute = typeof ROUTES;
