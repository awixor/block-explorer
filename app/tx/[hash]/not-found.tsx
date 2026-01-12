"use client";

import { useParams } from "next/navigation";
import { NotFoundDisplay } from "@/components/ui/not-found-display";

export default function TransactionNotFound() {
  const params = useParams();
  const hash = params?.hash as string;

  return (
    <NotFoundDisplay
      title="Transaction Not Found"
      description="We couldn't find a transaction with this hash. It might be pending or doesn't exist."
      type="Transaction"
      identifier={hash}
    />
  );
}
