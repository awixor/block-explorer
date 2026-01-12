"use client";

import { useParams } from "next/navigation";
import { NotFoundDisplay } from "@/components/ui/not-found-display";

export default function BlockNotFound() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <NotFoundDisplay
      title="Block Not Found"
      description="Oops! The block you are looking for does not exist on the Ethereum network."
      type="Block"
      identifier={id}
    />
  );
}
