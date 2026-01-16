import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const getClient = (chain?: string) => {
  if (chain === "sepolia") return sepoliaClient;
  return publicClient;
};
