import { publicClient } from "@/config/viem";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const block = await publicClient.getBlock({
    blockNumber: BigInt(id),
  });

  return <div>{block.number}</div>;
}
