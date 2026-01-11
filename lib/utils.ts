import { Hex, hexToString } from "viem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeHexToString = (hex: Hex): string => {
  try {
    return hexToString(hex);
  } catch (error) {
    console.error("Failed to decode hex:", error);
    return "";
  }
};
