import AddressDetailPage from "@/app/address/[address]/page";

export default async function SepoliaAddressDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ address: string }>;
  searchParams: Promise<{ chain?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const newSearchParams = Promise.resolve({
    ...resolvedSearchParams,
    chain: "sepolia",
  });

  return <AddressDetailPage params={params} searchParams={newSearchParams} />;
}
