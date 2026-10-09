import { Skeleton } from "@/components/ui/skeleton";

export default function QuotationsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-36" />
      {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[72px] rounded-lg" />)}
    </div>
  );
}