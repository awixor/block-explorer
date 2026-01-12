import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center bg-background font-sans">
      <main className="flex w-full max-w-5xl flex-col items-center gap-6 py-12 px-8 sm:px-16 sm:items-start">
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[400px] w-full rounded-md border" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[400px] w-full rounded-md border" />
        </div>
      </main>
    </div>
  );
}
