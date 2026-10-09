import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <Skeleton className="h-[320px] w-full rounded-lg" />
    </div>
  );
}