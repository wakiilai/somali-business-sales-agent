import { Skeleton } from "@/components/ui/skeleton";

export default function QuotationDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-48 rounded-lg" />
      <div className="grid grid-cols-2 gap-4"><Skeleton className="h-24 rounded-lg" /><Skeleton className="h-24 rounded-lg" /></div>
    </div>
  );
}