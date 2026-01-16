import BlockDetailPage from "@/app/block/[id]/page";

export default async function SepoliaBlockDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ chain?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const newSearchParams = Promise.resolve({
    ...resolvedSearchParams,
    chain: "sepolia",
  });

  return <BlockDetailPage params={params} searchParams={newSearchParams} />;
}
