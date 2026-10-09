import { Skeleton } from "@/components/ui/skeleton";

export default function AutomationsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-7 w-48" />
      {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-lg" />)}
    </div>
  );
}