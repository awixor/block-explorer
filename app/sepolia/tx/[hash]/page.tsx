import TransactionDetailPage from "@/app/tx/[hash]/page";

export default async function SepoliaTransactionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ hash: string }>;
  searchParams: Promise<{ chain?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const newSearchParams = Promise.resolve({
    ...resolvedSearchParams,
    chain: "sepolia",
  });

  return (
    <TransactionDetailPage params={params} searchParams={newSearchParams} />
  );
}
