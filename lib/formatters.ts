export const formatBlockNumber = (number: bigint | null): string => {
  if (number === null) return "—";

  return number.toString();
};

export const formatHash = (hash: string | null): string => {
  if (hash === null) return "—";

  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

export const formatTimestamp = (timestamp: bigint | null): string => {
  if (timestamp === null) return "—";

  return new Date(Number(timestamp) * 1000).toLocaleString();
};

export const formatGasUsed = (gas: bigint): string => {
  return new Intl.NumberFormat("en-US").format(gas);
};

export const formatGasCompact = (gas: bigint | number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(Number(gas));
};

export const formatGasPercentage = (used: bigint, limit: bigint): string => {
  if (limit === BigInt(0)) return "0%";

  const percentage = (Number(used) / Number(limit)) * 100;
  return `${percentage.toFixed(2)}%`;
};

export const formatTimeAgo = (timestamp: bigint): string => {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - Number(timestamp);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days !== 1 ? "s" : ""} ago`;
};
