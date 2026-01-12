import { cache } from "react";
import { parseAbi } from "viem";
import { publicClient } from "@/config/viem";

// The official Chainlink ETH/USD Price Feed address on Ethereum Mainnet
const CHAINLINK_ETH_USD_ADDRESS = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

// Minimal ABI to fetch the price
const aggregatorV3InterfaceABI = parseAbi([
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  "function decimals() external view returns (uint8)",
]);

export const getEthPrice = cache(async () => {
  try {
    const data = await publicClient.readContract({
      address: CHAINLINK_ETH_USD_ADDRESS,
      abi: aggregatorV3InterfaceABI,
      functionName: "latestRoundData",
    });

    const decimals = await publicClient.readContract({
      address: CHAINLINK_ETH_USD_ADDRESS,
      abi: aggregatorV3InterfaceABI,
      functionName: "decimals",
    });

    const price = Number(data[1]) / 10 ** decimals;
    return price;
  } catch (error) {
    console.error("Failed to fetch ETH price:", error);
    return 0;
  }
});
