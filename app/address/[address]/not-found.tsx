"use client";

import { useParams } from "next/navigation";
import { NotFoundDisplay } from "@/components/ui/not-found-display";

export default function AddressNotFound() {
  const params = useParams();
  const address = params?.address as string;

  return (
    <NotFoundDisplay
      title="Address Not Found"
      description="The address you are searching for could not be found or is invalid."
      type="Address"
      identifier={address}
    />
  );
}
