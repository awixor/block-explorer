import { Skeleton } from "./skeleton";
import { DetailCard } from "./detail-card";
import { DetailRow } from "./detail-row";

export function DetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
      </div>

      <div className="grid gap-6">
        <DetailCard title={<Skeleton className="h-6 w-24" />}>
          {Array.from({ length: 6 }).map((_, i) => (
            <DetailRow key={i} label={<Skeleton className="h-4 w-32" />}>
              <Skeleton className="h-4 w-full max-w-md" />
            </DetailRow>
          ))}
        </DetailCard>

        <DetailCard title={<Skeleton className="h-6 w-24" />}>
          {Array.from({ length: 4 }).map((_, i) => (
            <DetailRow key={i} label={<Skeleton className="h-4 w-32" />}>
              <Skeleton className="h-4 w-full max-w-md" />
            </DetailRow>
          ))}
        </DetailCard>
      </div>
    </div>
  );
}
