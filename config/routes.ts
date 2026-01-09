export const ROUTES = {
  HOME: "/",
  BLOCKS: "/blocks",
  // Dynamic routes
  BLOCK_DETAIL: (number: string | number) => `/blocks/${number}`,
} as const;

export type AppRoute = typeof ROUTES;
