export const sortingFn = (a: bigint | null, b: bigint | null): number => {
  const aValue = a ?? BigInt(0);
  const bValue = b ?? BigInt(0);

  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
};
